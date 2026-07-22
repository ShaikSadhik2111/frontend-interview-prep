// palindrome code
function isPalindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  // Compare the cleaned string with its reverse
  const reversedStr = cleanedStr.split('').reverse().join('');
  return cleanedStr === reversedStr;
}

console.log(isPalindrome('A man a plan a canal Panama')); // Output: true
console.log(isPalindrome('race a car')); // Output: false

//manual way
function isPalindromeManual(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  let left = 0;
  let right = cleanedStr.length - 1;   

  while (left < right) {
    if (cleanedStr[left] !== cleanedStr[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}
console.log(isPalindromeManual('A man a plan a canal Panama')); // Output: true
console.log(isPalindromeManual('race a car      ')); // Output: false