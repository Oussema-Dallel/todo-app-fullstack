import type { CustomRequest } from '../middlewares/contextMiddleware';
import type { NextFunction, Response } from 'express';

const asyncWrapper = <T>(asyncFunction: (request: CustomRequest<T>, response: Response) => Promise<void>) => {
	return function (request: CustomRequest<T>, response: Response, next: NextFunction): void {
		asyncFunction(request, response).catch(next);
	};
};

export { asyncWrapper };