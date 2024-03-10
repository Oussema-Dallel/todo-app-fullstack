import database from './database';
import type { Todo } from '../types/Todo';

const getTodosDatabase = async (): Promise<Todo[]> => {
	const { rows } = await database.query<Todo>('SELECT * FROM todo');

	return rows;
};

const createTodoDatabase = async (title: string): Promise<Todo> => {
	const newTodo = await database.query<Todo>(
		'INSERT INTO todo (title) VALUES ($1) RETURNING *',
		[ title ],
	);

	return newTodo.rows[0];
};

const updateTodoDatabase = async (id: string, title: string): Promise<Todo> => {
	const updatedTodo = await database.query<Todo>(
		'UPDATE todo SET title = $1 WHERE id = $2 RETURNING *',
		[ title, id ],
	);

	return updatedTodo.rows[0];
};

const deleteTodoDatabase = async (id: string): Promise<Todo> => {
	const deletedTodo = await database.query<Todo>(
		'DELETE FROM todo WHERE id = $1 RETURNING *',
		[ id ],
	);

	return deletedTodo.rows[0];
};

export { getTodosDatabase, createTodoDatabase, updateTodoDatabase, deleteTodoDatabase };
