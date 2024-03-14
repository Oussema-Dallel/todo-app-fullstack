import type { EmptyObject } from './EmptyObject';
import type { Request } from 'express';

type RequestWithBody<T> = Request<EmptyObject, EmptyObject, T, EmptyObject>;
type CustomRequest<T = undefined> = T extends undefined ? Request : RequestWithBody<T>;

export type { RequestWithBody, CustomRequest };