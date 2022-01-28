/**
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { PredicateWithIndex, SelectorWithIndex } from '@tsdotnet/common-interfaces';
import { IterableFilter, IterableValueTransform } from './IterableTransform';
import { Linq } from './linq';
import { Grouping, GroupingResult } from './transforms/groupBy';
/**
 * Extended version of `Linq<T>` that includes common LINQ methods like `.where()` and `.select()` and `.groupBy()`.
 */
export declare class LinqExtended<T> extends Linq<T> {
    /**
     * Returns a filtered sequence.
     * Same effect as .transform(filter).
     * @param {IterableValueTransform<T, TResult>} filter
     * @return {LinqExtended<TResult>}
     */
    filter<TResult>(filter: IterableValueTransform<T, TResult>): LinqExtended<TResult>;
    /**
     * Returns a filtered sequence.
     * @param {IterableFilter<T>} filters The filters to use.
     * @return {LinqExtended<T>}
     */
    filter(...filters: IterableFilter<T>[]): LinqExtended<T>;
    /**
     * Returns a filtered sequence.
     * @param {IterableFilter<T>} filters The filters to use.
     * @return {LinqExtended<T>}
     */
    filters(filters: Iterable<IterableFilter<T>>): LinqExtended<T>;
    /**
     * Returns a transformed sequence.
     * @param {IterableValueTransform<T, TResult>} transform The transform to use.
     * @return {LinqExtended<TResult>}
     */
    transform<TResult>(transform: IterableValueTransform<T, TResult>): LinqExtended<TResult>;
    /**
     * Filters a sequence of values based on a predicate.
     * @param {PredicateWithIndex<T>} predicate
     * @return {LinqExtended<T>}
     */
    where(predicate: PredicateWithIndex<T>): LinqExtended<T>;
    /**
     * Returns the number of entries in a sequence.
     * If a predicate is provided, filters the count based upon the predicate.
     * Otherwise counts all the entries in the sequence.
     * @param {PredicateWithIndex<T>} predicate
     * @return {boolean}
     */
    count(predicate?: PredicateWithIndex<T>): number;
    /**
     * Returns true if the predicate ever returns true. Otherwise false.
     * If no predicate is provided, returns true if the sequence has any entries.
     * @param {PredicateWithIndex<T>} predicate
     * @return {boolean}
     */
    any(predicate?: PredicateWithIndex<T>): boolean;
    /**
     * Returns false if the predicate ever returns false. Otherwise true.
     * @param {PredicateWithIndex<T>} predicate
     * @return {boolean}
     */
    all(predicate: PredicateWithIndex<T>): boolean;
    /**
     * Projects each element of a sequence into a new form.
     * @param {SelectorWithIndex<T, TResult>} selector
     * @return {LinqExtended<TResult>}
     */
    select<TResult>(selector: SelectorWithIndex<T, TResult>): LinqExtended<TResult>;
    /**
     * Projects each element of iterables as a flattened sequence of the selected.
     * @param {SelectorWithIndex<T, Iterable<TResult>>} selector
     * @return {LinqExtended<TResult>}
     */
    selectMany<TResult>(selector: SelectorWithIndex<T, Iterable<TResult>>): LinqExtended<TResult>;
    /**
     * Groups entries together by selected key.
     * @param {SelectorWithIndex<T, TKey>} keySelector
     * @return {LinqExtended<Grouping<TKey, T>>}
     */
    groupBy<TKey>(keySelector: SelectorWithIndex<T, TKey>): LinqExtended<LinqGrouping<TKey, T>>;
    /**
     * Returns all the entries in the sequence as an array.
     * @return {T[]}
     */
    toArray(): T[];
    /**
     * Returns the first element of a sequence.
     */
    first(): T;
    /**
     * Returns the first element of a sequence or the default value if no element is found.
     */
    firstOrDefault(): T | undefined;
    firstOrDefault(defaultValue: T): T;
    /**
     * Returns the last element of a sequence.
     */
    last(): T;
    /**
     * Returns the first element of a sequence or the default value if no element is found.
     */
    lastOrDefault(): T | undefined;
    lastOrDefault(defaultValue: T): T;
    /**
     * When resolving, skips the number of elements by the count.
     * @param {number} count The number elements to skip.
     * @return {LinqExtended<T>}
     */
    skip(count: number): LinqExtended<T>;
    /**
     * When resolving, takes no more than the number of elements by the provided count.
     * @param {number} count The number elements to skip.
     * @return {LinqExtended<T>}
     */
    take(count: number): LinqExtended<T>;
}
export declare class LinqGrouping<TKey, T> extends LinqExtended<T> implements Grouping<TKey, T> {
    readonly key: TKey;
    constructor(grouping: GroupingResult<TKey, T>);
}
/**
 * Returns a special extended version of Linq<T> which includes common operations like .where(predicate) .select(selector) and more with the consequence of a potentially larger footprint.
 * To minimize included modules use the standard version (linq) and import only the filters, transforms and resolutions needed.
 * @param {Iterable<T>} source
 * @return {Linq<T>}
 */
export default function linqExtended<T>(source: Iterable<T>): LinqExtended<T>;
