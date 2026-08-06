console.log({}.__proto__);

// why? 
// The __proto__ property of an object points to the prototype of the constructor function that created the object.
//  In this case, {} is an object literal, which is created by the Object constructor function. Therefore, {}.
// __proto__ points to Object.prototype, which is the prototype of all objects created by the Object constructor.