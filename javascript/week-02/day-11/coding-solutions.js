// Array and string manipulation problems

// string reverse
const reverseTheString = (str) => {
    let reversedString = '';
    for(let i = str.length - 1; i >= 0 ; i--){
        reversedString = reversedString + str[i];
    }
    return reversedString;
}

const theString = 'sadhik';
console.log(reverseTheString(theString));
console.log(reverseTheString('hello'));

// time complexity: O(n) where n is the length of the string
//space complexity: O(n) where n is the length of the string

// now same function using built-in methods
const reverseTheStringUsingBuiltInMethods = (str) => {
    return str.split('').reverse().join('');
}

console.log(reverseTheStringUsingBuiltInMethods(theString));
console.log(reverseTheStringUsingBuiltInMethods('hello'));

// time complexity: O(n) where n is the length of the string
//space complexity: O(n) where n is the length of the string

// by using array
const reverseTheStringUsingArray = (str) => {
    const strArray = str.split('');
    const reversedArray = [];
    for(let i = strArray.length - 1; i >= 0; i--){
        reversedArray.push(strArray[i]);
    }
    return reversedArray.join('');
}

console.log(reverseTheStringUsingArray(theString));
console.log(reverseTheStringUsingArray('hello'));

// time complexity: O(n) where n is the length of the string
//space complexity: O(n) where n is the length of the string

//palindrome check in arrow function
const isPalindrome = (str) => {
    for(let i = 0; i < str.length / 2; i++) {
        if(str[i] !== str[str.length - 1 - i]) {
            return false;
        }
    }
    return true;
}
const value = 'sadas'
console.log(isPalindrome(value));

// time complexity: O(n) where n is the length of the string
//space complexity: O(1) constant space

//palindrome by inbuilt methods
const isPalindromeUsingBuiltInMethods = (str) => {
    const reversedString = str.split('').reverse().join('');
    return str === reversedString;
}

const value2 = 'sadas'
console.log(isPalindromeUsingBuiltInMethods(value2));


// time complexity: O(n) where n is the length of the string
//space complexity: O(n) where n is the length of the string

//palindrome same build in method
const isPalindromeUsingBuiltInMethods2 = (str) => {
    if(str === str.split('').reverse().join('')) {
        return true;
    } else {
        return false;
    }
}
console.log(isPalindromeUsingBuiltInMethods2(value2));

// time complexity: O(n) where n is the length of the string
//space complexity: O(n) where n is the length of the string

//palindrome using array
const isPalindromeUsingArray = (str) => {
    const strArray = str.split('');
    const reversedArray = [];
    for(let i = strArray.length - 1; i >= 0; i--){
        reversedArray.push(strArray[i]);
    }
    return strArray.join('') === reversedArray.join('');
}
const value3 = 'madam'
console.log(isPalindromeUsingArray(value3));
const value4 = 'hello'
console.log(isPalindromeUsingArray(value4));

// time complexity: O(n) where n is the length of the string
//space complexity: O(n) where n is the length of the string

//finding maximum number in an array
const findMaxNumberInArray = (arr) => {
    let max = arr[0];
    for(let i = 1; i < arr.length; i++) {
        if(arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

const arr = [1, 2, 3, 4, 5];
console.log(findMaxNumberInArray(arr));

// time complexity: O(n) where n is the length of the array
//space complexity: O(1) constant space

//finding maximum number in an array using built-in methods
const findMaxNumberInArrayUsingBuiltInMethods = (arr) => {
    return Math.max(...arr);
}

const arr2 = [4, 9, 2, 7, 1];
console.log(findMaxNumberInArrayUsingBuiltInMethods(arr2));


// remove duplicates from an array
const removeDuplicatesFromArray = (arr) => {
    const uniqueArray = [];
    for(let i = 0; i < arr.length; i++) {
        if(!uniqueArray.includes(arr[i])) {
            uniqueArray.push(arr[i]);
        }
    }
    return uniqueArray;
}

console.log(removeDuplicatesFromArray([1, 2, 2, 3, 4, 4, 5]));
// time complexity: O(n^2) where n is the length of the array
//space complexity: O(n) where n is the length of the array

//by using built-in methods
const removeDuplicatesFromArrayUsingBuiltInMethods = (arr) => {
    return [...new Set(arr)];
}
console.log(removeDuplicatesFromArrayUsingBuiltInMethods([1, 2, 2, 3, 4, 4, 5]));

// time complexity: O(n) where n is the length of the array     
//space complexity: O(n) where n is the length of the array


//By using hashmap
const removeDuplicatesFromArrayUsingHashMap = (arr) => {
    const uniqueArray = [];
    const hashMap = {};
    for(let i = 0; i < arr.length; i++) {
        if(!hashMap[arr[i]]) {
            uniqueArray.push(arr[i]);
            hashMap[arr[i]] = true;
        }
    }
    return uniqueArray;
}

console.log(removeDuplicatesFromArrayUsingHashMap([1, 2, 2, 3, 4, 4, 5]));

// time complexity: O(n) where n is the length of the array
//space complexity: O(n) where n is the length of the array



// frequency maps problems

//character frequency map

//think in this way
// character
//     ↓
// check map
//     ↓
// exists?
//  ┌──┴──┐
// yes   no
//  ↓     ↓
// +1     1

//frequency map using hashmap
const countCharacters = (str) => {
    const frequencyMap = {};
    for(let i = 0; i < str.length; i++) {
        const char = str[i];
        if(frequencyMap[char]) {
            frequencyMap[char]++;
        } else {
            frequencyMap[char] = 1;
        }
    }
    return frequencyMap;
}

console.log(countCharacters('javascript'));
// time complexity: O(n) where n is the length of the string    
//space complexity: O(n) where n is the length of the string

//by using built-in methods
const countCharactersUsingBuiltInMethods = (str) => {
    const frequencyMap = {};
    str.split('').forEach(char => {
        frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    });
    return frequencyMap;
}
console.log(countCharactersUsingBuiltInMethods('javascript'));
// time complexity: O(n) where n is the length of the string
//space complexity: O(n) where n is the length of the string

//first non repeating character in a string
const firstNonRepeatingCharacter = (str) => {
    const frequencyMap = {};
    for(let i = 0; i < str.length; i++) {
        const char = str[i];
        if(frequencyMap[char]) {
            frequencyMap[char]++;
        } else {
            frequencyMap[char] = 1;
        }
    }
    for(let i = 0; i < str.length; i++) {
        if(frequencyMap[str[i]] === 1) {
            return str[i];
        }
    }
    return null;
}

console.log(firstNonRepeatingCharacter('swiss'));

// time complexity: O(n) where n is the length of the string
//space complexity: O(n) where n is the length of the string

//first non repeating character in a string using built-in methods
const firstNonRepeatingCharacterUsingBuiltInMethods = (str) => {
    const frequencyMap = {};
    str.split('').forEach(char => {
        frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    });
    for(let i = 0; i < str.length; i++) {
        if(frequencyMap[str[i]] === 1) {
            return str[i];
        }
    }   
return null;
}
console.log(firstNonRepeatingCharacterUsingBuiltInMethods('swiss'));

// time complexity: O(n) where n is the length of the string
//space complexity: O(n) where n is the length of the string

//anagram check
const isAnagram = (str1, str2) => {
    if(str1.length !== str2.length) {
        return false;
    }
    const frequencyMap1 = {};//
    const frequencyMap2 = {};
    for(let i = 0; i < str1.length; i++) {
        const char1 = str1[i];
        const char2 = str2[i];
        frequencyMap1[char1] = (frequencyMap1[char1] || 0) + 1;
        frequencyMap2[char2] = (frequencyMap2[char2] || 0) + 1;
    }
    for(const char in frequencyMap1) {
        if(frequencyMap1[char] !== frequencyMap2[char]) {
            return false;
        }
    }
    return true;
}
console.log(isAnagram('listen', 'silent'));

// time complexity: O(n) where n is the length of the string
//space complexity: O(n) where n is the length of the string

//anagram check using built-in methods
const isAnagramUsingBuiltInMethods = (str1, str2) => {
    if(str1.length !== str2.length) {
        return false;
    }
    const sortedStr1 = str1.split('').sort().join('');
    const sortedStr2 = str2.split('').sort().join('');
    return sortedStr1 === sortedStr2;
}
console.log(isAnagramUsingBuiltInMethods('listen', 'silent'));

// time complexity: O(n log n) where n is the length of the string
//space complexity: O(n) where n is the length of the string


// objects and has maps problems
// TWO SUM PROBLEM by using hashmap


// current number
//       ↓
// target - current
//       ↓
// Have I already seen it?
//       ↓
//       YES → answer
//       NO  → store it

const twoSum = (arr, target) => {
    const numMap = {};
    for(let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];
        if(numMap[complement] !== undefined) {
            return [numMap[complement], i];
        }
        numMap[arr[i]] = i;
    }
    return null;
}
console.log(twoSum([2, 7, 11, 15], 9));
// time complexity: O(n) where n is the length of the array/
//space complexity: O(n) where n is the length of the array

// TWO SUM PROBLEM by using built-in methods
const twoSumUsingBuiltInMethods = (arr, target) => {
    for(let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];
        const index = arr.indexOf(complement);
        if(index !== -1 && index !== i) {
            return [i, index];
        }
    }
    return null;
}
console.log(twoSumUsingBuiltInMethods([2, 7, 11, 15], 9));
// time complexity: O(n^2) where n is the length of the array
//space complexity: O(1) constant space

//Array transformation problems


//group objects
//input 
const users = [
    { name: "A", role: "admin" },
    { name: "B", role: "user" },
    { name: "C", role: "admin" }
];

// reduce()
//    +
// object
//    +
// array

//output
// {
//     admin: [
//         { name: "A", role: "admin" },
//         { name: "C", role: "admin" }
//     ],
//     user: [
//         { name: "B", role: "user" }
//     ]
// }

const groupByRole = (users) => {
    return users.reduce((acc, user) => {
        if(!acc[user.role]) {
            acc[user.role] = [];
        }
        acc[user.role].push(user);
        return acc;
    }, {});
}
console.log(groupByRole(users));    


// time complexity: O(n) where n is the length of the array
//space complexity: O(n) where n is the length of the array

//group objects by using for loop
const groupByRoleUsingForLoop = (users) => {
    const groupedUsers = {};    
    for(const user of users) {
        if(!groupedUsers[user.role]) {
            groupedUsers[user.role] = [];
        }
        groupedUsers[user.role].push(user);
    }
    return groupedUsers;
}
console.log(groupByRoleUsingForLoop(users));
// time complexity: O(n) where n is the length of the array
//space complexity: O(n) where n is the length of the array

//flatten array by using flatten method

// Array
//  │
//  ├── primitive → push
//  │
//  └── array
//        ↓
//      recurse
//flatten array normally
const flattenArrayNormal = (arr) => {
    const flattenedArray = [];
    for(const item of arr) {
        if(Array.isArray(item)) {
            flattenedArray.push(...flattenArrayNormal(item));// ... this spread operator expands the elements of the array into individual elements, allowing them to be pushed into the flattenedArray.
        } else {
            flattenedArray.push(item);
        }
    }
    return flattenedArray;
}
console.log(flattenArrayNormal([1, [2, [3, 4]], 5]));
// time complexity: O(n) where n is the total number of elements in the nested arrays
// space complexity: O(n) where n is the total number of elements in the nested arrays

//flatten array by using built-in methods
const flattenArray = (arr) => {
    return arr.flat(Infinity);
}
console.log(flattenArray([1, [2, [3, 4]], 5]));
// time complexity: O(n) where n is the total number of elements in the nested arrays
// space complexity: O(n) where n is the total number of elements in the nested arrays

//create counter function

// createCounter()
//       │
//       ▼
//    count = 0
//       │
//       ▼
//  returns function
//       │
//       ▼
//  closure remembers count

const createCounter = () => {
    let count = 0;
    return () => {
        count++;
        return count;
    }
}
const counter = createCounter();
console.log(counter());
console.log(counter());
console.log(counter());
// time complexity: O(1) constant time
// space complexity: O(1) constant space


//once function
// closure
// +
// state
// +
// function execution

const init = () => {
    let executed = false;
    return (fn) => {
        if(!executed) {
            executed = true;
            return fn();
        }
    }   
}
const once = init();
const logOnce = () => console.log('Initialized');
once(logOnce);
once(logOnce);
// time complexity: O(1) constant time
// space complexity: O(1) constant space



// finding longest word in a string

// string
//  ↓
// split words
//  ↓
// iterate
//  ↓
// track longest
const findLongestWord = (str) => {
    const words = str.split(' ');
    let longestWord = '';
    for(const word of words) {
        if(word.length > longestWord.length) {
            longestWord = word;
        }   
    }
    return longestWord;
}
const sentence = "I am preparing for frontend interview";
console.log(findLongestWord(sentence));
// time complexity: O(n) where n is the length of the string
// space complexity: O(n) where n is the length of the string

// finding longest word in a string using built-in methods
const findLongestWordUsingBuiltInMethods = (str) => {
    return str.split(' ').reduce((longest, word) => {
        return word.length > longest.length ? word : longest;
    }
, '');
}
console.log(findLongestWordUsingBuiltInMethods(sentence));
// time complexity: O(n) where n is the length of the string
// space complexity: O(n) where n is the length of the string

//count occurrences of a word in a string normal method array as input
//given
// ["apple", "banana", "apple", "orange", "banana", "apple"]
//op
// {
//     apple: 3,
//     banana: 2,
//     orange: 1
// }
const countOccurrences = (arr) => {
    const occurrences = {};
    for(const item of arr) {
        occurrences[item] = (occurrences[item] || 0) + 1;
    }
    return occurrences;
}
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
console.log(countOccurrences(fruits));
// time complexity: O(n) where n is the length of the array
// space complexity: O(n) where n is the length of the array

//count occurrences of a word in a string using built-in methods
const countOccurrencesUsingBuiltInMethods = (arr) => {
    return arr.reduce((occurrences, item) => {  
        occurrences[item] = (occurrences[item] || 0) + 1;
        return occurrences;
    }, {});
}
const fruits2 = ["apple", "banana", "apple", "orange", "banana", "apple"];
console.log(countOccurrencesUsingBuiltInMethods(fruits2));
// time complexity: O(n) where n is the length of the array
// space complexity: O(n) where n is the length of the array

//intersection of two arrays normal method
//input
// [1, 2, 3, 4, 5]
// [4, 5, 6, 7, 8]
//op
// [3, 4]
//intersection of two arrays normal method
//Set / Hash Map
const intersectionOfTwoArrays = (arr1, arr2) => {
    const intersection = [];
    for(const item of arr1) {
        if(arr2.includes(item)) {
            intersection.push(item);
        }
    }
    return intersection;
}
console.log(intersectionOfTwoArrays([1, 2, 3, 4], [3, 4, 5, 6]));
// time complexity: O(n*m) where n is the length of the first array and m is the length of the second array
// space complexity: O(n) where n is the length of the first array

//intersection of two arrays using built-in methods
const intersectionOfTwoArraysUsingBuiltInMethods = (arr1, arr2) => {
    return arr1.filter(item => arr2.includes(item));
}
console.log(intersectionOfTwoArraysUsingBuiltInMethods([1, 2, 3, 4], [3, 4, 5, 6]));
// time complexity: O(n*m) where n is the length of the first array and m is the length of the second array
// space complexity: O(n) where n is the length of the first array


//check valid parantheses //challenge problem
//input
// "()[]{}"
// Input
//  ↓
// Opening bracket
//  ↓
// push

// Closing bracket
//  ↓
// compare with top
//  ↓
// match?
//  ├── yes → pop
//  └── no  → false
const isValidParentheses = (str) => {
    const stack = [];
    const map = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    for(const char of str) {
        if(map[char]) {
            stack.push(char);
        } else {
            const last = stack.pop();
            if(map[last] !== char) {
                return false;
            }
        }
    }
    return stack.length === 0;
}
const parentheses = "()[]{}";
const parentheses2 = "([)]";
const parentheses3 = "{[]}";
console.log(isValidParentheses(parentheses));
console.log(isValidParentheses(parentheses2));
console.log(isValidParentheses(parentheses3));
// time complexity: O(n) where n is the length of the string
// space complexity: O(n) where n is the length of the string


