//reduce with no method
function myReduce(arr, callback, initialValue) {
    // If arr is missing, use empty array to avoid errors.
    arr = arr || [];    
    const hasInitialValue = initialValue !== undefined;

    // If no initial value is provided, use the first element of arr.
    let accumulator = hasInitialValue ? initialValue : arr[0];
    for(let i = hasInitialValue ? 0 : 1; i < arr.length; i++) {
        // callback(accumulator, currentValue, currentIndex, array)
        // is called for each element to update the accumulator.
        accumulator = callback(accumulator, arr[i], i, arr);
    }
    // Return the final accumulated value.
    return accumulator;
}

const arr = [1, 2, 3, 4, 5];
// Example usage of myReduce to sum the array elements.
const sum = myReduce(arr, (acc, curr) => acc + curr, 0);
console.log(sum); // Output: 15

//with method
const reduceMethod = (arr, callback, initialValue) => {
    // Built-in reduce does the same thing:
    // it processes each element and accumulates a single value.
    return arr.reduce(callback, initialValue);
}

const arr2 = [1, 2, 3, 4, 5];
const sum2 = reduceMethod(arr2, (acc, curr) => acc + curr, 0);
console.log(sum2); // Output: 15