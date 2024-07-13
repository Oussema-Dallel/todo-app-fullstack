import type { CustomRequest } from '../../middlewares/contextMiddleware';
import { generateToken } from '../../utils/auth';
import type { Response } from 'express';
import { compare, genSalt, hash } from 'bcrypt';
import { createUserInDatabase, getUserByCredentialsFromDatabase, getUsersFromDatabase } from '../../database/users';

const getUsers = async (_: CustomRequest<undefined>, response: Response): Promise<void> => {
	const users = await getUsersFromDatabase();

	response.status(200).json(users);
};

const getUserByCredentials = async (
	customRequest: CustomRequest<{ email: string; password: string }>,
	response: Response,
): Promise<void> => {
	const { email, password } = customRequest.body;

	try {
		const user = await getUserByCredentialsFromDatabase(email);
		const decryptedPassword = await compare(password, user.password);

		if (!decryptedPassword) {
			response.status(401).json({ message: 'Unauthorized' });

			return;
		}

		const userId = user.id;
		const token = generateToken(userId);

		response.cookie('token', token, {
			httpOnly: true,
			secure: true,
		});
		response.status(200).json(user);
	} catch (ex) {
		console.error(ex);
		response.status(500).json({ message: 'Something went wrong!' });
	}
};

const createUser = async (
	request: CustomRequest<{ email: string; password: string; userName: string }>,
	response: Response,
): Promise<void> => {
	const { userName, email, password } = request.body;

	const saltRounds = 10;
	const salt: string = await genSalt(saltRounds);

	const hashedPassword = await hash(password, salt);

	try {
		const newUser = await createUserInDatabase(userName, email, hashedPassword);

		response.status(201).json(newUser);
	} catch (ex) {
		response.status(500).json({ message: ex });
	}
};

export { getUsers, createUser, getUserByCredentials };