/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';

/**
 * Returns an array (copy) of all the elements in a sequence.
 */
export default function toArray<T> (sequence: Iterable<T>): T[] {
	if(!sequence) throw new ArgumentNullException('sequence');
	const result: T[] = [];
	for(const e of sequence) result.push(e);
	return result;
}
