import { Router } from 'express';
import type { RouterOptions } from 'express';

class BaseRouter {
	public router;
	public constructor ({ routerOptions = {} }: { routerOptions?: RouterOptions }) {
		this.router = Router(routerOptions);
		this.initializeRoutes();
	}

	protected initializeRoutes (): void {
		this.router.get('/', (request, response) => {
			response.send('Hello from BaseRouter');
		});
	}
}

export { BaseRouter };