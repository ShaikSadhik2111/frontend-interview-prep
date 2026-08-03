// without using flat make flat [1,[2,[3]]]
const arr = [1, [2, [3]]];
const flatArray = [];

function flattenArray(array) {
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            flattenArray(array[i]);
        } else {
            flatArray.push(array[i]);
        }
    }
    return flatArray;
}

console.log(flattenArray(arr));


//with flat
const arr1 = [1, [2, [3]]];
const flatArray1 = arr1.flat(3);
console.log(flatArray1);