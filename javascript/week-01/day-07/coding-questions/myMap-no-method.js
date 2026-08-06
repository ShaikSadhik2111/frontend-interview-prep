// implemnt my map wiithout usig method
function myMap(arr, callback) {
    // If arr is null/undefined, use empty array as fallback.
    arr = arr || [];

    // New array to store transformed values.
    const result = [];

    // Loop through each item of input array.
    for(let i=0;i<arr.length;i++){
       // callback(arr[i], i, arr) works like real map:
       // arr[i] -> current value
       // i -> current index
       // arr -> original array
       // The returned value is pushed into result.
       result.push(callback(arr[i],i,arr))
    }

    // Return the new transformed array.
    return result;
}

const arr =[1,2,3,4,5];
const mappedArr = myMap(arr,(num) => num * 2);
console.log(mappedArr); // Output: [2, 4, 6, 8, 10]

//with method
const mapMethod = (arr, callback) => {
    // Built-in map does the same thing internally:
    // it visits each element, applies callback,
    // and returns a brand new array.
    return arr.map(callback);
}

const arr2 =[1,2,3,4,5];
const mapp2 = mapMethod(arr2,(num) => num * 2);
console.log(mapp2); // Output: [2, 4, 6, 8, 10]