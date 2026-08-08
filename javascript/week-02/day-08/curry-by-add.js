//curry an add() function
function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };    
}
const add5 = add(5);
const add5And10 = add5(10);
const add5And10And15 = add5And10(15);
console.log(add5And10(15)); // Output: 30