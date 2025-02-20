"use strict";
/*
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ArgumentNullException_1 = (0, tslib_1.__importDefault)(require("@tsdotnet/exceptions/dist/ArgumentNullException"));
const InvalidOperationException_1 = (0, tslib_1.__importDefault)(require("@tsdotnet/exceptions/dist/InvalidOperationException"));
/**
 * Returns the entry in the sequence that has the lowest/least value.
 * @param {Iterable<T>} sequence
 * @return {T}
 */
function min(sequence) {
    if (!sequence)
        throw new ArgumentNullException_1.default('sequence');
    const i = sequence[Symbol.iterator]();
    let n = i.next();
    if (n.done)
        throw new InvalidOperationException_1.default('Sequence is empty.  Use defaultIfEmpty to ensure a default value.');
    let min = n.value;
    while (!(n = i.next()).done) {
        if (n.value < min)
            min = n.value;
    }
    return min;
}
exports.default = min;
//# sourceMappingURL=min.js.map