import database from './database';
import type { User } from '../types/User';

const getUsersFromDatabase = async (): Promise<User[]> => {
	const { rows } = await database.query<User>('SELECT * FROM "user"');

	return rows;
};

const createUserInDatabase = async (username: string, email: string, password: string): Promise<User> => {
	const checkUser = await database.query<User>(
		'SELECT * FROM "user" WHERE email = $1',
		[ email ],
	);

	if (checkUser.rows.length > 0) throw new Error('User with that email already exists');
	const newUser = await database.query<User>(
		'INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING *',
		[ username, email, password ],
	);

	return newUser.rows[0];
};

const updateUserInDatabase = async (id: string, username: string, email: string, password: string): Promise<User> => {
	const updatedUser = await database.query<User>(
		'UPDATE "user" SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
		[ username, email, password, id ],
	);

	return updatedUser.rows[0];
};

const deleteUserFromDatabase = async (id: string): Promise<User> => {
	const deletedUser = await database.query<User>(
		'DELETE FROM "user" WHERE id = $1 RETURNING *',
		[ id ],
	);

	return deletedUser.rows[0];
};

export { getUsersFromDatabase, createUserInDatabase, updateUserInDatabase, deleteUserFromDatabase };