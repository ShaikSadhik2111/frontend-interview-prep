// palindrome without anhy methods
function checkPalindrome(str) {
    for(let i =0; i< str.length/2; i++) {
      if(str[i] !== str[str.length - 1 - i]) {
        return false;
      }
    }
    return true;

}

console.log(checkPalindrome("6116"))


//by using inbuilt methods
const isPalindrome = (str) => {
    const reversedStr = str.split("").reverse().join("");
    return str === reversedStr;
}
console.log(isPalindrome("racecar"));