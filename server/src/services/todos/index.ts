import type { EmptyObject } from '../../types/EmptyObject';
import type { RequestWithBody } from '../../types/RequestWithBody';
import type { Response } from 'express';
import { createTodoDatabase, deleteTodoDatabase, getTodosDatabase, updateTodoDatabase } from '../../database/todos';

const getTodos = async (request: RequestWithBody<{ title: string }>, response: Response): Promise<void> => {
	const todos = await getTodosDatabase();

	response.status(200).json(todos);
};

const createTodo = async (request: RequestWithBody<{ title: string }>, response: Response): Promise<void> => {
	const { title } = request.body;
	const newTodo = await createTodoDatabase(title);

	response.status(201).json(newTodo);
};

const updateTodo = async (request: RequestWithBody<{ title: string }>, response: Response): Promise<void> => {
	const { title } = request.body;
	const { id } = request.params;
	const updatedTodo = await updateTodoDatabase(id, title);

	response.status(200).json(updatedTodo);
};

const deleteTodo = async (request: RequestWithBody<EmptyObject>, response: Response): Promise<void> => {
	const { id } = request.params;
	const deletedTodo = await deleteTodoDatabase(id);

	response.status(200).json(deletedTodo);
};

export { getTodos, createTodo, updateTodo, deleteTodo };