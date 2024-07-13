import type { CustomRequest } from '../../middlewares/contextMiddleware';
import type { EmptyObject } from '../../types/EmptyObject';
import { isNil } from '../../utils/isNil';
import type { Response } from 'express';
import { createTodoDatabase, deleteTodoDatabase, getTodosDatabase, updateTodoDatabase } from '../../database/todos';

const getTodos = async (request: CustomRequest, response: Response): Promise<void> => {
	const userId = request.context?.userId;

	if (isNil(userId)) {
		response.status(400).json({ message: 'User ID is missing' });

		return;
	}

	const todos = await getTodosDatabase(userId);

	response.status(200).json(todos);
};

const createTodo = async (request: CustomRequest<{ title: string }>, response: Response): Promise<void> => {
	const { title } = request.body;
	const userId = request.context?.userId;

	if (isNil(userId)) {
		response.status(400).json({ message: 'User ID is missing' });

		return;
	}

	const newTodo = await createTodoDatabase(title, userId);

	response.status(201).json(newTodo);
};

const updateTodo = async (request: CustomRequest<{ title: string }>, response: Response): Promise<void> => {
	const { title } = request.body;
	const { id } = request.params;
	const userId = request.context?.userId;

	if (isNil(userId)) {
		response.status(500).json({ message: 'no User ID provided' });

		return;
	}

	try {
		const updatedTodo = await updateTodoDatabase(id, title, userId);

		response.status(200).json(updatedTodo);
	} catch (ex) {
		response.status(500).json(ex);
	}
};

const deleteTodo = async (request: CustomRequest<EmptyObject>, response: Response): Promise<void> => {
	const { id } = request.params;
	const userId = request.context?.userId;

	if (isNil(userId)) {
		response.status(400).json({ message: 'User ID is missing' });

		return;
	}

	const deletedTodo = await deleteTodoDatabase(id, userId);

	response.status(200).json(deletedTodo);
};

export { getTodos, createTodo, updateTodo, deleteTodo };