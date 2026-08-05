//without using flatten method implement flatten array
function flattenArray(arr) {
    const result = [];
    for(let i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
            const flat = flattenArray(arr[i]);
            for(let j = 0; j < flat.length; j++) {
                result.push(flat[j]);
            }
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}

console.log(flattenArray([1, [2, [3, 4], 5], 6])); // Output: [1, 2, 3, 4, 5, 6]

// How it works step by step:

// 1. `result` is a new empty array to collect final flat values.
// 2. Loop through each item in `arr`.
// 3. For each item:
//    - If item is an array (`Array.isArray(...) === true`):
//      - Call `flattenArray` again on that inner array.
//      - This gives a flat array (`flat`).
//      - Push each value from `flat` into `result`.
//    - If item is not an array:
//      - Push it directly into `result`.
// 4. After loop finishes, return `result`.

// Dry run for input:
// ```javascript
// [1, [2, [3, 4], 5], 6]
// ```

// Top-level:
// - `1` → not array → `result = [1]`
// - `[2, [3,4], 5]` → array → recurse
// - `6` → not array → later added

// Recursive call on `[2, [3,4], 5]`:
// - `2` → push
// - `[3,4]` → recurse
// - `5` → push

// Recursive call on `[3,4]`:
// - `3` push
// - `4` push
// - returns `[3,4]`

// Back to `[2,[3,4],5]`:
// - merge `[3,4]` into current result
// - returns `[2,3,4,5]`

// Back to top-level:
// - merge `[2,3,4,5]` into `[1]` → `[1,2,3,4,5]`
// - then push `6` → `[1,2,3,4,5,6]`

// Final return:
// ```javascript
// [1, 2, 3, 4, 5, 6]
// ```

// Why recursion is needed:
// - You don’t know how deep nesting is (`[1,[2,[3,[4]]]]`).
// - Recursion handles each nested level with the same logic until only normal values remain.

// Time/space idea:
// - Time: roughly `O(n)` for total elements visited.
// - Space: extra array + recursion call stack for nested depth.


//with method flat
const arr1 = [1, [2, [3, 4], 5], 6];
const flatArray1 = arr1.flat(1);
console.log(flatArray1); // Output: [1, 2, 3, 4, 5, 6]

//code explanation
//why need to give 3?

// You give `3` because `flat(depth)` needs to know **how many nesting levels** to remove.

// In your array:

// ```javascript
// [1, [2, [3, 4], 5], 6]
// ```

// Nesting levels:
// 1. Level 1: outer array
// 2. Level 2: `[2, [3, 4], 5]`
// 3. Level 3: `[3, 4]`

// So `flat(3)` means “flatten up to 3 levels”, which is enough to fully flatten this array.

// Important detail:
// - For this specific array, `flat(2)` is also enough.
// - `flat(1)` would give: `[1, 2, [3, 4], 5, 6]` (still one nested array left).

// Quick rule:
// - `flat(1)` removes one layer
// - `flat(2)` removes two layers
// - `flat(Infinity)` removes all nested layers, no matter depth

// So if you are not sure about depth, use:

// ```javascript
// arr1.flat(Infinity)
// ```

// In flatten-array.js, `3` works, but it is a bit more than needed for this exact input.