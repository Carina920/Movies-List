"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compare_1 = require("./compare");
const range_tree_1 = require("./range-tree");
/**
 * Normalizes a process coverage.
 *
 * Sorts the scripts alphabetically by `url`.
 * Reassigns script ids: the script at index `0` receives `"0"`, the script at
 * index `1` receives `"1"` etc.
 * This does not normalize the script coverages.
 *
 * @param processCov Process coverage to normalize.
 */
function normalizeProcessCov(processCov) {
    processCov.result.sort(compare_1.compareScriptCovs);
    for (const [scriptId, scriptCov] of processCov.result.entries()) {
        scriptCov.scriptId = scriptId.toString(10);
    }
}
exports.normalizeProcessCov = normalizeProcessCov;
/**
 * Normalizes a process coverage deeply.
 *
 * Normalizes the script coverages deeply, then normalizes the process coverage
 * itself.
 *
 * @param processCov Process coverage to normalize.
 */
function deepNormalizeProcessCov(processCov) {
    for (const scriptCov of processCov.result) {
        deepNormalizeScriptCov(scriptCov);
    }
    normalizeProcessCov(processCov);
}
exports.deepNormalizeProcessCov = deepNormalizeProcessCov;
/**
 * Normalizes a script coverage.
 *
 * Sorts the function by root range (pre-order sort).
 * This does not normalize the function coverages.
 *
 * @param scriptCov Script coverage to normalize.
 */
function normalizeScriptCov(scriptCov) {
    scriptCov.functions.sort(compare_1.compareFunctionCovs);
}
exports.normalizeScriptCov = normalizeScriptCov;
/**
 * Normalizes a script coverage deeply.
 *
 * Normalizes the function coverages deeply, then normalizes the script coverage
 * itself.
 *
 * @param scriptCov Script coverage to normalize.
 */
function deepNormalizeScriptCov(scriptCov) {
    for (const funcCov of scriptCov.functions) {
        normalizeFunctionCov(funcCov);
    }
    normalizeScriptCov(scriptCov);
}
exports.deepNormalizeScriptCov = deepNormalizeScriptCov;
/**
 * Normalizes a function coverage.
 *
 * Sorts the ranges (pre-order sort).
 * TODO: Tree-based normalization of the ranges.
 *
 * @param funcCov Function coverage to normalize.
 */
function normalizeFunctionCov(funcCov) {
    funcCov.ranges.sort(compare_1.compareRangeCovs);
    const tree = range_tree_1.RangeTree.fromSortedRanges(funcCov.ranges);
    normalizeRangeTree(tree);
    funcCov.ranges = tree.toRanges();
}
exports.normalizeFunctionCov = normalizeFunctionCov;
/**
 * @internal
 */
function normalizeRangeTree(tree) {
    tree.normalize();
}
exports.normalizeRangeTree = normalizeRangeTree;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9zcmMvbm9ybWFsaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXFGO0FBQ3JGLDZDQUF5QztBQUd6Qzs7Ozs7Ozs7O0dBU0c7QUFDSCxTQUFnQixtQkFBbUIsQ0FBQyxVQUFzQjtJQUN4RCxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBaUIsQ0FBQyxDQUFDO0lBQzFDLEtBQUssTUFBTSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQy9ELFNBQVMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUM1QztBQUNILENBQUM7QUFMRCxrREFLQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxTQUFnQix1QkFBdUIsQ0FBQyxVQUFzQjtJQUM1RCxLQUFLLE1BQU0sU0FBUyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7UUFDekMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDbkM7SUFDRCxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBTEQsMERBS0M7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsU0FBb0I7SUFDckQsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsNkJBQW1CLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRkQsZ0RBRUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0Isc0JBQXNCLENBQUMsU0FBb0I7SUFDekQsS0FBSyxNQUFNLE9BQU8sSUFBSSxTQUFTLENBQUMsU0FBUyxFQUFFO1FBQ3pDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQy9CO0lBQ0Qsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUxELHdEQUtDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILFNBQWdCLG9CQUFvQixDQUFDLE9BQW9CO0lBQ3ZELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUFnQixDQUFDLENBQUM7SUFDdEMsTUFBTSxJQUFJLEdBQWMsc0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFFLENBQUM7SUFDcEUsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDbkMsQ0FBQztBQUxELG9EQUtDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxJQUFlO0lBQ2hELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNuQixDQUFDO0FBRkQsZ0RBRUMiLCJmaWxlIjoibm9ybWFsaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcGFyZUZ1bmN0aW9uQ292cywgY29tcGFyZVJhbmdlQ292cywgY29tcGFyZVNjcmlwdENvdnMgfSBmcm9tIFwiLi9jb21wYXJlXCI7XG5pbXBvcnQgeyBSYW5nZVRyZWUgfSBmcm9tIFwiLi9yYW5nZS10cmVlXCI7XG5pbXBvcnQgeyBGdW5jdGlvbkNvdiwgUHJvY2Vzc0NvdiwgU2NyaXB0Q292IH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqXG4gKiBOb3JtYWxpemVzIGEgcHJvY2VzcyBjb3ZlcmFnZS5cbiAqXG4gKiBTb3J0cyB0aGUgc2NyaXB0cyBhbHBoYWJldGljYWxseSBieSBgdXJsYC5cbiAqIFJlYXNzaWducyBzY3JpcHQgaWRzOiB0aGUgc2NyaXB0IGF0IGluZGV4IGAwYCByZWNlaXZlcyBgXCIwXCJgLCB0aGUgc2NyaXB0IGF0XG4gKiBpbmRleCBgMWAgcmVjZWl2ZXMgYFwiMVwiYCBldGMuXG4gKiBUaGlzIGRvZXMgbm90IG5vcm1hbGl6ZSB0aGUgc2NyaXB0IGNvdmVyYWdlcy5cbiAqXG4gKiBAcGFyYW0gcHJvY2Vzc0NvdiBQcm9jZXNzIGNvdmVyYWdlIHRvIG5vcm1hbGl6ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVByb2Nlc3NDb3YocHJvY2Vzc0NvdjogUHJvY2Vzc0Nvdik6IHZvaWQge1xuICBwcm9jZXNzQ292LnJlc3VsdC5zb3J0KGNvbXBhcmVTY3JpcHRDb3ZzKTtcbiAgZm9yIChjb25zdCBbc2NyaXB0SWQsIHNjcmlwdENvdl0gb2YgcHJvY2Vzc0Nvdi5yZXN1bHQuZW50cmllcygpKSB7XG4gICAgc2NyaXB0Q292LnNjcmlwdElkID0gc2NyaXB0SWQudG9TdHJpbmcoMTApO1xuICB9XG59XG5cbi8qKlxuICogTm9ybWFsaXplcyBhIHByb2Nlc3MgY292ZXJhZ2UgZGVlcGx5LlxuICpcbiAqIE5vcm1hbGl6ZXMgdGhlIHNjcmlwdCBjb3ZlcmFnZXMgZGVlcGx5LCB0aGVuIG5vcm1hbGl6ZXMgdGhlIHByb2Nlc3MgY292ZXJhZ2VcbiAqIGl0c2VsZi5cbiAqXG4gKiBAcGFyYW0gcHJvY2Vzc0NvdiBQcm9jZXNzIGNvdmVyYWdlIHRvIG5vcm1hbGl6ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBOb3JtYWxpemVQcm9jZXNzQ292KHByb2Nlc3NDb3Y6IFByb2Nlc3NDb3YpOiB2b2lkIHtcbiAgZm9yIChjb25zdCBzY3JpcHRDb3Ygb2YgcHJvY2Vzc0Nvdi5yZXN1bHQpIHtcbiAgICBkZWVwTm9ybWFsaXplU2NyaXB0Q292KHNjcmlwdENvdik7XG4gIH1cbiAgbm9ybWFsaXplUHJvY2Vzc0Nvdihwcm9jZXNzQ292KTtcbn1cblxuLyoqXG4gKiBOb3JtYWxpemVzIGEgc2NyaXB0IGNvdmVyYWdlLlxuICpcbiAqIFNvcnRzIHRoZSBmdW5jdGlvbiBieSByb290IHJhbmdlIChwcmUtb3JkZXIgc29ydCkuXG4gKiBUaGlzIGRvZXMgbm90IG5vcm1hbGl6ZSB0aGUgZnVuY3Rpb24gY292ZXJhZ2VzLlxuICpcbiAqIEBwYXJhbSBzY3JpcHRDb3YgU2NyaXB0IGNvdmVyYWdlIHRvIG5vcm1hbGl6ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVNjcmlwdENvdihzY3JpcHRDb3Y6IFNjcmlwdENvdik6IHZvaWQge1xuICBzY3JpcHRDb3YuZnVuY3Rpb25zLnNvcnQoY29tcGFyZUZ1bmN0aW9uQ292cyk7XG59XG5cbi8qKlxuICogTm9ybWFsaXplcyBhIHNjcmlwdCBjb3ZlcmFnZSBkZWVwbHkuXG4gKlxuICogTm9ybWFsaXplcyB0aGUgZnVuY3Rpb24gY292ZXJhZ2VzIGRlZXBseSwgdGhlbiBub3JtYWxpemVzIHRoZSBzY3JpcHQgY292ZXJhZ2VcbiAqIGl0c2VsZi5cbiAqXG4gKiBAcGFyYW0gc2NyaXB0Q292IFNjcmlwdCBjb3ZlcmFnZSB0byBub3JtYWxpemUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwTm9ybWFsaXplU2NyaXB0Q292KHNjcmlwdENvdjogU2NyaXB0Q292KTogdm9pZCB7XG4gIGZvciAoY29uc3QgZnVuY0NvdiBvZiBzY3JpcHRDb3YuZnVuY3Rpb25zKSB7XG4gICAgbm9ybWFsaXplRnVuY3Rpb25Db3YoZnVuY0Nvdik7XG4gIH1cbiAgbm9ybWFsaXplU2NyaXB0Q292KHNjcmlwdENvdik7XG59XG5cbi8qKlxuICogTm9ybWFsaXplcyBhIGZ1bmN0aW9uIGNvdmVyYWdlLlxuICpcbiAqIFNvcnRzIHRoZSByYW5nZXMgKHByZS1vcmRlciBzb3J0KS5cbiAqIFRPRE86IFRyZWUtYmFzZWQgbm9ybWFsaXphdGlvbiBvZiB0aGUgcmFuZ2VzLlxuICpcbiAqIEBwYXJhbSBmdW5jQ292IEZ1bmN0aW9uIGNvdmVyYWdlIHRvIG5vcm1hbGl6ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUZ1bmN0aW9uQ292KGZ1bmNDb3Y6IEZ1bmN0aW9uQ292KTogdm9pZCB7XG4gIGZ1bmNDb3YucmFuZ2VzLnNvcnQoY29tcGFyZVJhbmdlQ292cyk7XG4gIGNvbnN0IHRyZWU6IFJhbmdlVHJlZSA9IFJhbmdlVHJlZS5mcm9tU29ydGVkUmFuZ2VzKGZ1bmNDb3YucmFuZ2VzKSE7XG4gIG5vcm1hbGl6ZVJhbmdlVHJlZSh0cmVlKTtcbiAgZnVuY0Nvdi5yYW5nZXMgPSB0cmVlLnRvUmFuZ2VzKCk7XG59XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVSYW5nZVRyZWUodHJlZTogUmFuZ2VUcmVlKTogdm9pZCB7XG4gIHRyZWUubm9ybWFsaXplKCk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
