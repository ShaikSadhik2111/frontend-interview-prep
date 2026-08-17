// const isValidParentheses = (str) => {
//     const stack = [];
//     const map = {
//         '(': ')',
//         '[': ']',
//         '{': '}'
//     };
//     for(const char of str) {
//         console.log(stack,'stack');
//         console.log(map,'map');
//         console.log(char,'char');
//         if(map[char]) {
//             stack.push(char);
//         } else {
//             const last = stack.pop();
//             console.log(last,'last');
//             console.log(map[last],'map[last]');
//             console.log(char,'char');
//             if(map[last] !== char) {
//                 return false;
//             }
//         }
//     }
//     return stack.length === 0;
// }
// const parentheses = "()[]{}";
// console.log(isValidParentheses(parentheses));


// const isValidParentheses = (str) => {
//     const stack = [];
//     const map = {
//         '(': ')',
//         '[': ']',
//         '{': '}'
//     };
//     for(const char of str) {
//         if(map[char]) {
//             stack.push(char);
//         } else {
//             const last = stack.pop();
//             if(map[last] !== char) {
//                 return false;
//             }
//         }
//     }
//     return stack.length === 0;
// }
// const parentheses = "()[]{}";
// const parentheses2 = "([)]";
// const parentheses3 = "{[]}";
// console.log(isValidParentheses(parentheses));
// console.log(isValidParentheses(parentheses2));
// console.log(isValidParentheses(parentheses3));