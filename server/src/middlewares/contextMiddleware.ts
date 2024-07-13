import type { EmptyObject } from '../types/EmptyObject';
import type { NextFunction, Request, Response } from 'express';

interface RequestContext {
	userId?: string;
}

interface CustomRequest<T = unknown> extends Request<
EmptyObject,
EmptyObject,
T,
EmptyObject
> {
	context?: RequestContext;
}

const contextMiddleware = <T>(request: CustomRequest<T>, response: Response, next: NextFunction): void => {
	request.context = {};
	next();
};

export type { CustomRequest, RequestContext };
export { contextMiddleware };