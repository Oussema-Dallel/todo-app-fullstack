import type { RequestWithBody } from '../types/RequestWithBody';
import type { NextFunction, Response } from 'express';

const asyncWrapper = <T>(asyncFunction: (request: RequestWithBody<T>, response: Response) => Promise<void>) => {
	return function (request: RequestWithBody<T>, response: Response, next: NextFunction): void {
		asyncFunction(request, response).catch(next);
	};
};

export { asyncWrapper };