import type { CustomRequest } from '../middlewares/contextMiddleware';
import { isNil } from './isNil';
import { JWT_SECRET } from './envSetup';
import type { NextFunction, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

const verifyToken = (request: CustomRequest, response: Response, next: NextFunction): void => {
	const token = request.cookies.token as unknown;

	request.context = {};

	if (isNil(token)) {
		response.status(403).json({ message: 'Unauthorized' });
	}

	try {
		const decoded = verify(token as string, JWT_SECRET) as { userId: string };

		request.context.userId = decoded.userId;
		next();
	} catch {
		response.status(403).json({ message: 'Unauthorized' });
	}
};

const generateToken = (userId: string): string => {
	return sign({ userId }, JWT_SECRET, { expiresIn: '5m' });
};

export { verifyToken, generateToken };