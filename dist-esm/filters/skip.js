/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import empty from '../iterables/empty';
import same from './same';
/**
 * An iterable filter that bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @param {number} count
 * @return {IterableFilter<T>}
 */
export default function skip(count) {
    if (isNaN(count) || count <= 0)
        return same;
    if (!isFinite(count))
        return empty;
    return function (sequence) {
        return {
            *[Symbol.iterator]() {
                let remain = count;
                for (const e of sequence) {
                    if (0 < remain--)
                        continue;
                    yield e;
                }
            }
        };
    };
}
//# sourceMappingURL=skip.js.map