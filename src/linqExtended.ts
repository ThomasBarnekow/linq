/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import {PredicateWithIndex, SelectorWithIndex} from '@tsdotnet/common-interfaces';
import applyFilters from './applyFilters';
import where from './filters/where';
import {IterableFilter, IterableValueTransform} from './IterableTransform';
import {Linq} from './linq';
import all from './resolutions/all';
import any from './resolutions/any';
import count from './resolutions/count';
import toArray from './resolutions/toArray';
import groupBy, {Grouping} from './transforms/groupBy';
import select from './transforms/select';

export class LinqExtended<T>
	extends Linq<T>
{

	/**
	 * Returns a filtered sequence.
	 * Same effect as .transform(filter).
	 * @param {IterableValueTransform<T, TResult>} filter
	 * @return {LinqExtended<TResult>}
	 */
	filter<TResult> (filter: IterableValueTransform<T, TResult>): LinqExtended<TResult>;

	/**
	 * Returns a filtered sequence.
	 * @param {IterableFilter<T>} filters The filters to use.
	 * @return {LinqExtended<T>}
	 */
	filter (...filters: IterableFilter<T>[]): LinqExtended<T>;

	/**
	 * Returns a filtered sequence.
	 * @param {IterableFilter<T>} filters The filters to use.
	 * @return {LinqExtended<T>}
	 */
	filter (...filters: IterableFilter<T>[]): LinqExtended<T>
	{
		return filters.length ? this.filters(filters) : this;
	}

	/**
	 * Returns a filtered sequence.
	 * @param {IterableFilter<T>} filters The filters to use.
	 * @return {LinqExtended<T>}
	 */
	filters (filters: Iterable<IterableFilter<T>>): LinqExtended<T>
	{
		return new LinqExtended<T>(applyFilters(this, filters));
	}

	/**
	 * Returns a transformed sequence.
	 * @param {IterableValueTransform<T, TResult>} transform The transform to use.
	 * @return {LinqExtended<TResult>}
	 */
	transform<TResult> (transform: IterableValueTransform<T, TResult>): LinqExtended<TResult>
	{
		return new LinqExtended(transform(this));
	}

	////// EXTENDED METHODS //////

	/**
	 * Filters a sequence of values based on a predicate.
	 * @param {PredicateWithIndex<T>} predicate
	 * @return {LinqExtended<T>}
	 */
	where (predicate: PredicateWithIndex<T>): LinqExtended<T>
	{
		return this.filter(where(predicate));
	}

	/**
	 * Returns the number of entries in a sequence.
	 * If a predicate is provided, filters the count based upon the predicate.
	 * Otherwise counts all the entries in the sequence.
	 * @param {PredicateWithIndex<T>} predicate
	 * @return {boolean}
	 */
	count (predicate?: PredicateWithIndex<T>): number
	{
		return predicate ? count(where(predicate)(this)) : count(this);
	}

	/**
	 * Returns true if the predicate ever returns true. Otherwise false.
	 * If no predicate is provided, returns true if the sequence has any entries.
	 * @param {PredicateWithIndex<T>} predicate
	 * @return {boolean}
	 */
	any (predicate?: PredicateWithIndex<T>): boolean
	{
		return any(predicate)(this);
	}

	/**
	 * Returns false if the predicate ever returns false. Otherwise true.
	 * @param {PredicateWithIndex<T>} predicate
	 * @return {boolean}
	 */
	all (predicate: PredicateWithIndex<T>): boolean
	{
		return all(predicate)(this);
	}

	/**
	 * Projects each element of a sequence into a new form.
	 * @param {SelectorWithIndex<T, TResult>} selector
	 * @return {LinqExtended<TResult>}
	 */
	select<TResult> (selector: SelectorWithIndex<T, TResult>): LinqExtended<TResult>
	{
		return this.transform(select(selector));
	}

	/**
	 * Groups entries together by selected key.
	 * @param {SelectorWithIndex<T, TKey>} keySelector
	 * @return {LinqExtended<Grouping<TKey, T>>}
	 */
	groupBy<TKey> (keySelector: SelectorWithIndex<T, TKey>): LinqExtended<Grouping<TKey, T>>
	{
		return this.transform(groupBy(keySelector));
	}

	/**
	 * Returns all the entries in the sequence as an array.
	 * @return {T[]}
	 */
	toArray (): T[]
	{
		return toArray(this);
	}
}

/**
 * Returns a special extended version of Linq<T> which includes common operations like .where(predicate) .select(selector) and more with the consequence of a potentially larger footprint.
 * To minimize included modules use the standard version (linq) and import only the filters, transforms and resolutions needed.
 * @param {Iterable<T>} source
 * @return {Linq<T>}
 */
export default function linqExtended<T> (source: Iterable<T>): LinqExtended<T> {
	if(source instanceof LinqExtended) return source;
	return new LinqExtended<T>(source);
}
