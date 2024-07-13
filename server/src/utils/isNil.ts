import type { Nil, Nillable } from '../types/Nil';

const isNil = <TActual>(potentialNil: Nillable<TActual>): potentialNil is Nil => {
	return potentialNil === undefined || potentialNil === null;
};

export { isNil };