import type { EmptyObject } from './EmptyObject';
import type { Request } from 'express';

type RequestWithBody<T> = Request<EmptyObject, EmptyObject, T, EmptyObject>;

export type { RequestWithBody };