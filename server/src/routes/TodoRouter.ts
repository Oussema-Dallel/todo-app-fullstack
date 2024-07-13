import { asyncWrapper } from '../utils/asyncWrapper';
import { BaseRouter } from './BaseRouter';
import type { Todo } from '../types/Todo';
import { verifyToken } from '../utils/auth';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../services/todos';

class TodoRouter extends BaseRouter {
	public constructor () {
		super({});
	}

	protected initializeRoutes (): void {
		this.router.get('/', verifyToken, asyncWrapper(getTodos));

		this.router.post('/todos', verifyToken, asyncWrapper<Todo>(createTodo));

		this.router.put('/todos/:id', verifyToken, asyncWrapper<Todo>(updateTodo));

		this.router.delete('/todos/:id', verifyToken, asyncWrapper(deleteTodo));
	}
}

export { TodoRouter };