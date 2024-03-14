import type { CustomRequest } from '../../types/RequestWithBody';
import type { Response } from 'express';
import { createUserInDatabase, getUsersFromDatabase } from '../../database/users';
import { genSalt, hash } from 'bcrypt';

const getUsers = async (_: CustomRequest, response: Response): Promise<void> => {
	const users = await getUsersFromDatabase();

	response.status(200).json(users);
};

const createUser = async (
	request: CustomRequest<{ email: string; name: string; password: string }>,
	response: Response,
): Promise<void> => {
	const { name, email, password } = request.body;
	const saltRounds = 10;
	const salt: string = await genSalt(saltRounds);

	const hashedPassword = await hash(password, salt);
	const newUser = await createUserInDatabase(name, email, hashedPassword);

	response.status(201).json(newUser);
};

export { getUsers, createUser };