// 1.
console.log(a);

var a=10; //op: undefined beacuse of hoisting, the variable declaration is hoisted to the top of its scope, but the assignment remains in place. Therefore, when console.log(a) is executed, a is declared but not yet assigned a value, resulting in undefined being logged to the console.

// 2.
console.log(b);

let b=20; //TDZ error: Cannot access 'b' before initialization. This is because variables declared with let and const are not hoisted in the same way as var. They are in a "temporal dead zone" from the start of the block until the declaration is encountered, so trying to access them before their declaration results in a ReferenceError.

// 3.
console.log("A");

setTimeout(()=>{

console.log("B");

},0);

Promise.resolve()

.then(()=>{

console.log("C");

});

console.log("D");

//op: A D C B cause the synchronous code runs first, logging "A" and "D". The Promise's then callback is queued in the microtask queue, which runs after the current synchronous code but before the setTimeout callback, resulting in "C" being logged next. Finally, the setTimeout callback runs, logging "B".

//4.

const obj={

name:"JS",

show(){

console.log(this.name);

}

}

const fn=obj.show;

fn();
//op: undefined because when fn is called, it is not called as a method of obj, so this inside show() refers to the global object (or undefined in strict mode), and since there is no name property on the global object, it logs undefined.

//5.

function outer(){

let count=0;

return function(){

count++;

console.log(count);

}

}

const c=outer();

c();

c();

c();

//op: 1 2 3 because each time c() is called, it increments the count variable that is preserved in the closure created by the outer function. The count variable retains its value between calls, resulting in the output of 1, 2, and 3 on successive calls.

