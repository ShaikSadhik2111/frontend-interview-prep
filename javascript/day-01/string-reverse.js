// simple function to reverse a string
// function reverseTheString (value) {
//     return value.split('').reverse().join('');
// }

// console.log(reverseTheString('bosch')); // Output: 'hcsob'

//now manually through loop
function reverseString(value) {
    let reversed = '';
    for (let i = value.length - 1; i >= 0; i--) {
        reversed += value[i];
    }
    return reversed;
}

console.log(reverseString('hcsob')); // Output: 'hcsob'


