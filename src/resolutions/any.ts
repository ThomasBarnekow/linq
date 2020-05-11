/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

import isEmpty from './isEmpty';

/**
 * Returns true if sequence is not empty.
 */
export default function any<T> (sequence: Iterable<T>): boolean {
	return !isEmpty(sequence);
}
