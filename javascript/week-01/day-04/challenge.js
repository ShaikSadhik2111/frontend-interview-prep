function Person(name){

this.name = name;

}

Person.prototype.sayHello = function(){

console.log("Hello",this.name);

}

const p1 = new Person("Sadhik");

p1.sayHello();

/*
ANSWERS:

1. Where is sayHello stored?
   - sayHello is stored on Person.prototype
   - When p1.sayHello() is called, JavaScript looks up the prototype chain:
     p1 → Person.prototype → Object.prototype
   - It finds sayHello on Person.prototype

2. Does every object get a copy?
   - No! Every instance (p1, p2, etc.) shares the SAME sayHello function
   - All Person instances reference the same method via the prototype chain
   - Only the name property is unique to each instance

3. Why is this memory efficient?
   - If sayHello was copied to each instance, it would waste memory
   - With 1000 Person objects, you'd have 1000 copies of the same function
   - Using prototypes, all 1000 instances share 1 copy of sayHello
   - This saves significant memory and improves performance
*/

