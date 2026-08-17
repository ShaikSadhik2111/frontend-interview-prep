// //check valid paranthsis coding
// //input
// // "()[]{}"

// const checkParanthesis = (str) => {
//     const stack = []; //LIFO principle
//     const map ={
//         '(':')',
//         '[':']',
//         '{':'}'
//     }
//     for(const char of str){
//         if(map[char]){
//             stack.push(char);
//         } else {
//             const popLast = stack.pop();
//             if(map[popLast] !== char){
//                 return false;
//             }
//         }
//     }
//      return stack.length === 0;
// }

// console.log(checkParanthesis('{[]}]'))

//intersection of two arrays
//using built in method

// const interSectionArrays = (arr1,arr2) => {
//     return arr1.filter(item => arr2.includes(item));
// }

// const arr1 = [1,2,3,4,5,6];
// const arr2 = [3,4,5,6,7];
// console.log(interSectionArrays(arr1,arr2))

// //no built in methods
// const interSectionArraysNo = (arr1,arr2) =>{
//     const tempo = [];
//     for(const arr of arr1){
//         if(arr2.includes(arr)){
//             tempo.push(arr)
//         }
//     }
//     return tempo;
// }

// const arra1 = [1,2,3,4,5,6];
// const arra2 = [3,4,5,6,7];
// console.log(interSectionArraysNo(arra1,arra2))


// //Counting occurences
// const countOccurences = (arr) => {
//     const newList = {}
//         for(const items of arr){
//             newList[items] = (newList[items] || 0) + 1;
//         }
//     return newList;
// }

// console.log(countOccurences(["apple", "banana", "apple", "orange", "banana", "apple"]))


//by using reducing method

// const usingReduceTocountOccurence = (arr) => {
//     return arr.reduce((occu,item) => {
//         occu[item] = (occu[item] || 0) + 1;
//     return  occu;
// },{} );
// }
// console.log(usingReduceTocountOccurence(["apple", "banana", "apple", "orange", "banana", "apple"]))


// //finding largest word in a string
// const largestWordInString = (str) => {
//     const words = str.split(' ');
//     let longestWord = '';
//     for(const word of words){
//         if(word.length > longestWord.length){
//             longestWord = word
//         }
//             }
// return longestWord
    
// }
// const sentence = "I am preparing for frontend interview";
// console.log(largestWordInString(sentence));

//if need last word shich is larget keep word.length>=longestWord.length

//using built in methods

// const longestWord = (str) => {
//     return str.split(' ').reduce((longest,word) => {
//         return word.length >= longest.length? word: longest
//     },' ')
// }

// const sentence = "I am preparing for frontend interview";
// console.log(longestWord(sentence));

//intialization of function making as call once
// const init = () =>  {
//     let executed = false;
//     return (fn) => {
//         if(!executed){
//             executed = true;
//             return fn();
//         }
//     }
// }
// //intialization
// const once= init();
// const logOnce = () => console.log('intialized');
// once(logOnce);



//counter function
// const counterCreate = ( ) => {
//     let count = 0;
//     return () => {
//         count ++;
//         return count;
//     }
// }

// const counter  =  counterCreate()
// console.log(counter ())
// console.log(counter ())
// console.log(counter ())
// console.log(counter ())
// console.log(counter ())

//flatten array
// const flattenArrayToNormal = (arr) => {
//     const flattenArray = [];
//     for (const item of arr){
//         if(Array.isArray(item)){
//             flattenArray.push(...flattenArrayToNormal(item))
//         } else {
//             flattenArray.push(item)
//         }
//     }
//     return flattenArray;
// }
// console.log(flattenArrayToNormal([1, [2, [3, 4]], 5]));

//by inbuilt

// const arrayFlatNoraml = (arr) => {
//     return arr.flat(3)//depth is 3 or we can keep Infinity also 
// }

// console.log(arrayFlatNoraml([1, [2, [3, 4]], 5]));


//grouping objects
//by loops
//input
//const users = [
//     { name: "A", role: "admin" },
//     { name: "B", role: "user" },
//     { name: "C", role: "admin" }
// ];
//op
// {
//     admin: [
//         { name: "A", role: "admin" },
//         { name: "C", role: "admin" }
//     ],
//     user: [
//         { name: "B", role: "user" }
//     ]
// }

// const groupingUsers = (users) => {
//     let groupedUsers = {};
//     for(const user of users){
//         if(!groupedUsers[user.role]){
//             groupedUsers[user.role] = [];
//         }
//         groupedUsers[user.role].push(user);
//     }
//     return groupedUsers;
// }

// const users = [
//     { name: "A", role: "admin" },
//     { name: "B", role: "user" },
//     { name: "C", role: "admin" }
// ];

// console.log(groupingUsers(users))

//by using built i nmethods means by reduce

// const groupByRole = (users) => {
//     return users.reduce((acc, user) => {
//         if(!acc[user.role]) {
//             acc[user.role] = []
//         }
//         acc[user.role].push(user)
//         return acc
//     },{})
// }

// const users = [
//     { name: "A", role: "admin" },
//     { name: "B", role: "user" },
//     { name: "C", role: "admin" }
// ];

// console.log(groupByRole(users))


// //two sum of the target
// const twoSumTarget = (arra, target) => {
//     const numMap  = {}; //hashmap 
//     for(let i=0;i<arra.length;i++){
//         const haveSeen = target - arra[i]
//         if(numMap[haveSeen] !== undefined){
//             return [numMap[haveSeen],i]
//         }
//         numMap[arra[i]] = i;
//     }
//     return null;
// }
// console.log(twoSumTarget([15, 7, 11, 2],22));


//built in methods
// const twoSumTarget = (arr,target) => {
// //     for(let i=0;i< arr.length;i++){
// //         const haveseen = target - arr[i];
// //         const getIndex = arr.indexOf(haveseen);
// //         if(getIndex !== -1 && getIndex !== i){
// //             return [i , getIndex];
// //         }
// //     }
// //     return null;
// // }

// // console.log(twoSumTarget([2, 7, 11, 15], 9));


// //anagram check
// const checkAnagram = (str1,str2) => {
//     if(str1.length !== str2.length)
//     {
//         return;
//     }
//     const freq1={}
//     const freq2={}
//     for(let i=0; i< str1.length;i++){
//         const char1 = str1[i];
//         const char2 = str2[i];
//         freq1[char1] = (freq1[char1] || 0) + 1;
//         freq2[char2]=(freq2[char2] || 0) + 1;
//         console.log(freq1)
//         console.log(freq2)
//     }
//     for(const char in freq1){
//         if(freq1[char] !== freq2[char]){
//             return false;
//         }
//     }
//         return true;
// }

// console.log(checkAnagram('listen', 'silent'));


// by using inbuilt methods
// const inMethodsAnagram = (str1,str2) => {
//     if(str1.length !== str2.length){
//         return;
//     }
//     let sorted1 = str1.split('').sort().join('');
//     let sorted2 = str2.split('').sort().join('');
//     return sorted1 === sorted2;
// }
// console.log(inMethodsAnagram('listen', 'silent'))
