import { asyncWrapper } from '../utils/asyncWrapper';
import { BaseRouter } from './BaseRouter';
import { createUser, getUserByCredentials } from '../services/users';

class UserRouter extends BaseRouter {
	public constructor () {
		super({});
	}

	protected initializeRoutes (): void {
		this.router.post('/signup', asyncWrapper<{ email: string; password: string; userName: string }>(createUser));
		this.router.post('/login', asyncWrapper<{ email: string; password: string }>(getUserByCredentials));
	}
}

export { UserRouter };