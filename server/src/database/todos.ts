import database from './database';
import type { Todo } from '../types/Todo';

const getTodosDatabase = async (userId: string): Promise<Todo[]> => {
	const { rows } = await database.query<Todo>('SELECT * FROM todo WHERE user_id = $1', [ userId ]);

	return rows;
};

const createTodoDatabase = async (title: string, userId: string): Promise<Todo> => {
	const newTodo = await database.query<Todo>(
		'INSERT INTO todo (title, user_id) VALUES ($1, $2) RETURNING *',
		[ title, userId ],
	);

	return newTodo.rows[0];
};

const updateTodoDatabase = async (id: string, title: string, userId: string): Promise<Todo> => {
	const updatedTodo = await database.query<Todo>(
		'UPDATE todo SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
		[ title, id, userId ],
	);

	return updatedTodo.rows[0];
};

const deleteTodoDatabase = async (id: string, userId: string): Promise<Todo> => {
	const deletedTodo = await database.query<Todo>(
		'DELETE FROM todo WHERE id = $1 AND user_id = $2 RETURNING *',
		[ id, userId ],
	);

	return deletedTodo.rows[0];
};

export { getTodosDatabase, createTodoDatabase, updateTodoDatabase, deleteTodoDatabase };
