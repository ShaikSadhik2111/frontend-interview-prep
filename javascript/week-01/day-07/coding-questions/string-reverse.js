// string reverse manually
function reverseString(str) {
    let result = "";
    for(let i = str.length - 1; i >= 0; i--) {
        result += str[i];
    }
    return result;
}
console.log(reverseString("hello world"));


// now for learning lets do in reversed string to normal

//using function expression for this

const reverseToNormal = function (sentence) {
    let r = "";
    for(let j = sentence.length - 1; j >= 0; j--) {
        r += sentence[j]; //concatinating the characters in reverse order
    }
    return r;
}
console.log(reverseToNormal("dlrow olleh"));

//by using inbuilt methods
//const reverse = (str) => {return str.reverse().join("")};// error because string is not an array so we need to convert it into array first
const reverse = (str) => {return str.split("").reverse().join("")};
console.log(reverse("hello world"));