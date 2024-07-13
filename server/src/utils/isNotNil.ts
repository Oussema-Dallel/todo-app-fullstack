import { isNil } from './isNil';
import type { Nillable } from '../types/Nil';

const isNotNill = <TActual>(shouldNotBeNil: Nillable<TActual>): shouldNotBeNil is TActual => {
	return !isNil(shouldNotBeNil);
};

export { isNotNill };