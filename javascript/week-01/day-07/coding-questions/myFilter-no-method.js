//myfilter without no method
function myFilter(arr, callback) {
    // If arr is missing, use empty array to avoid errors.
    arr = arr || [];

    // Store only the values that pass the callback condition.
    const result =[];

    // Loop through each item in the input array.
    for(let i=0;i<arr.length;i++){
        // callback(arr[i], i, arr) returns true or false.
        // If true, keep the current value.
        // If false, skip it.
        if(callback(arr[i],i,arr)){
            result.push(arr[i]);
        }
    }

    // Return the filtered array.
    return result;
}
const arr1 = [1,2,3,4,5];
const filteredArr = myFilter(arr1, (num) => num %2 === 0);
console.log(filteredArr); // Output: [2, 4]

//with method
const filterMethod = (arr, callback) => {
    // Built-in filter does the same thing:
    // it checks every element and keeps only matching ones.
    return arr.filter(callback);
}   
const arr2 = [1,2,3,4,5];
const filtered2 = filterMethod(arr2, (num) => num % 2 === 0);
console.log(filtered2); // Output: [2, 4]