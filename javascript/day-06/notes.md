<!-- Topic - array methods -->

what is map()?

it is an array method,  which creates a new array by applying a callback function to each element of orginal array.
it returs the array of same lenth  with each element trasnaformed according to callback.
it never modifies the original array making pure , non mutuating operational ideal for functional programming.

ex:
const numbers = [1,2,3,,4,5];
const doubled = numbers.map(num => num* 2)
console.log(doubled) op:[2,4,6,8]
cosnoel.log(numbers) op: [1,2,3,4]

syntax & params
array.map(callback(element, index, array), thisArg)

Parameter	  Description
element   	The current element being processed
index	      The index of the current element (optional)
array	      The array map() was called on (optional)
thisArg	    Value to use as this in callback (optional, rarely used)

<!-- basix transformations -->
// Double every number
const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map(n => n * 2)
console.log(doubled)  // [2, 4, 6, 8, 10]

// Convert to uppercase
const words = ['hello', 'world']
const shouting = words.map(word => word.toUpperCase())
console.log(shouting)  // ['HELLO', 'WORLD']

// Square each number
const squares = numbers.map(n => n * n)
console.log(squares)  // [1, 4, 9, 16, 25]



const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
]

// Get just the names
const names = users.map(user => user.name)
console.log(names)  // ['Alice', 'Bob', 'Charlie']

// Get just the emails
const emails = users.map(user => user.email)
console.log(emails)  // ['alice@example.com', 'bob@example.com', 'charlie@example.com']

// Get IDs as strings
const ids = users.map(user => `user-${user.id}`)
console.log(ids)  // ['user-1', 'user-2', 'user-3']

using index parameter,

const letters = ['a', 'b', 'c', 'd']

// Add index to each item
const indexed = letters.map((letter, index) => `${index}: ${letter}`)
console.log(indexed)  // ['0: a', '1: b', '2: c', '3: d']

// Create objects with IDs
const items = ['apple', 'banana', 'cherry']
const products = items.map((name, index) => ({
  id: index + 1,
  name
}))
console.log(products)
// [{ id: 1, name: 'apple' }, { id: 2, name: 'banana' }, { id: 3, name: 'cherry' }]

<!-- map() done -->

<!-- filter() -->

what is filter() in js?

it is an array  method that creates a new array only the elements that passes a test  implemented byt call back function , wher ethe callback returns true,
true are included and false are excluded , and its  like map never modiufies orginal array.

const num = [1,2,3,4,5,6,7,8,9];
const onlyEven = num.filter(n => n%2 === 0)
console.log(onlyEven)
console.log(num)

syntax and parameters

array.filter(callback(element, index, array), thisArg)  

<!-- basoic filtering -->

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Keep only even numbers
const evens = numbers.filter(n => n % 2 === 0)
console.log(evens)  // [2, 4, 6, 8, 10]

// Keep only odds
const odds = numbers.filter(n => n % 2 !== 0)
console.log(odds)  // [1, 3, 5, 7, 9]

// Keep numbers greater than 5
const big = numbers.filter(n => n > 5)
console.log(big)  // [6, 7, 8, 9, 10]

// Keep numbers between 3 and 7
const middle = numbers.filter(n => n >= 3 && n <= 7)
console.log(middle)  // [3, 4, 5, 6, 7]

<!-- by objects -->

const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 17, active: true },
  { name: 'Charlie', age: 30, active: false },
  { name: 'Diana', age: 22, active: true }
]

// Keep only active users
const activeUsers = users.filter(user => user.active)
console.log(activeUsers)
// [{ name: 'Alice', ... }, { name: 'Bob', ... }, { name: 'Diana', ... }]

// Keep only adults (18+)
const adults = users.filter(user => user.age >= 18)
console.log(adults)
// [{ name: 'Alice', ... }, { name: 'Charlie', ... }, { name: 'Diana', ... }]

// Keep only active adults
const activeAdults = users.filter(user => user.active && user.age >= 18)
console.log(activeAdults)
// [{ name: 'Alice', ... }, { name: 'Diana', ... }]

<!-- searching and query filtering example -->

const products = [
  { name: 'MacBook Pro', category: 'laptops', price: 2000 },
  { name: 'iPhone', category: 'phones', price: 1000 },
  { name: 'iPad', category: 'tablets', price: 800 },
  { name: 'Dell XPS', category: 'laptops', price: 1500 }
]

// Search by name (case-insensitive)
const searchTerm = 'mac'
const results = products.filter(p => 
  p.name.toLowerCase().includes(searchTerm.toLowerCase())
)
console.log(results)  // [{ name: 'MacBook Pro', ... }]

// Filter by category
const laptops = products.filter(p => p.category === 'laptops')
console.log(laptops)  // [{ name: 'MacBook Pro', ... }, { name: 'Dell XPS', ... }]

// Filter by price range
const affordable = products.filter(p => p.price <= 1000)
console.log(affordable)  // [{ name: 'iPhone', ... }, { name: 'iPad', ... }]




<!-- reduce() in js -->
what is reduce() in js?

in js reduce is a method taht executes a "reducer" fucntion on each element, rsulting in a single output value , most powerfila nd confusing one in js.


Def:

it is an array method that executes a reducer callback() function on each element , accu,ulating the results in a single value , this value cna be any type a bumber, string, object or an another attay also.
the call back recevies a accumulater - the running total an dteh current element  returning the new accumulater value , always provides the intial value  to avoid crache sin intial array.

ex:

const num = [1,2,3,4,5]
const add = num.reduce((accu, cur) => accu + cur, 0)
console.log(add)

its a like, Think of reduce like a snowball rolling down a hill. It starts small (the initial value) and grows as it picks up each element.

syntax;
array.reduce(callback(accumulator, currentValue, index, array), initialValue)


Step-by-Step Visualization,

const numbers = [1, 2, 3, 4]
const sum = numbers.reduce((acc, curr) => acc + curr, 0)

Iteration	accumulator	currentValue	acc + curr	New accumulator
1st	0 (initial)	1	0 + 1	1
2nd	1	2	1 + 2	3
3rd	3	3	3 + 3	6
4th	6	4	6 + 4	10


┌─────────────────────────────────────────────────────────────────────────┐
│                         reduce() STEP BY STEP                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Initial value: 0                                                        │
│                                                                          │
│  [1, 2, 3, 4].reduce((acc, curr) => acc + curr, 0)                       │
│                                                                          │
│  Step 1:  acc=0, curr=1  →  0 + 1 = 1   (accumulator becomes 1)          │
│  Step 2:  acc=1, curr=2  →  1 + 2 = 3   (accumulator becomes 3)          │
│  Step 3:  acc=3, curr=3  →  3 + 3 = 6   (accumulator becomes 6)          │
│  Step 4:  acc=6, curr=4  →  6 + 4 = 10  (final result!)                  │
│                                                                          │
│  Result: 10                                                              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

common cases,

const numbers = [10, 20, 30, 40, 50]

// Sum
const sum = numbers.reduce((acc, n) => acc + n, 0)
console.log(sum)  // 150

// Average
const average = numbers.reduce((acc, n) => acc + n, 0) / numbers.length
console.log(average)  // 30


Finding Max/Min,

const numbers = [5, 2, 9, 1, 7]

const max = numbers.reduce((acc, n) => n > acc ? n : acc, numbers[0])
console.log(max)  // 9

const min = numbers.reduce((acc, n) => n < acc ? n : acc, numbers[0])
console.log(min)  // 1

// Or use Math.max/min with spread (simpler for this case)
console.log(Math.max(...numbers))  // 9
console.log(Math.min(...numbers))  // 1

counting accurence,

const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple']

const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1
  return acc
}, {})

console.log(count)  // { apple: 3, banana: 2, orange: 1 }

//grpimg by property

const people = [
  { name: 'Alice', department: 'Engineering' },
  { name: 'Bob', department: 'Marketing' },
  { name: 'Charlie', department: 'Engineering' },
  { name: 'Diana', department: 'Marketing' }
]

const byDepartment = people.reduce((acc, person) => {
  const dept = person.department
  if (!acc[dept]) {
    acc[dept] = []
  }
  acc[dept].push(person)
  return acc
}, {})

console.log(byDepartment)
// {
//   Engineering: [{ name: 'Alice', ... }, { name: 'Charlie', ... }],
//   Marketing: [{ name: 'Bob', ... }, { name: 'Diana', ... }]
// }

const people = [
  { name: 'Alice', department: 'Engineering' },
  { name: 'Bob', department: 'Marketing' },
  { name: 'Charlie', department: 'Engineering' },
  { name: 'Diana', department: 'Marketing' }
]

const byDepartment = people.reduce((acc, person) => {
  const dept = person.department
  if (!acc[dept]) {
    acc[dept] = []
  }
  acc[dept].push(person)
  return acc
}, {})

console.log(byDepartment)
// {
//   Engineering: [{ name: 'Alice', ... }, { name: 'Charlie', ... }],
//   Marketing: [{ name: 'Bob', ... }, { name: 'Diana', ... }]
// }

<!-- chaining of above methods -->
const transactions = [
  { type: 'sale', amount: 100 },
  { type: 'refund', amount: 30 },
  { type: 'sale', amount: 200 },
  { type: 'sale', amount: 150 },
  { type: 'refund', amount: 50 }
]

const totalSales = transactions
  .filter(t => t.type === 'sale')           // Keep only sales
  .map(t => t.amount)                        // Extract amounts
  .reduce((sum, amount) => sum + amount, 0)  // Sum them up

console.log(totalSales)  // 450

<!-- forEach() -->
It is an array method to execute  provided function onc efor each element in the array,
it works as a cleaner more redable alternative for tradional for loop , 
only use when we want to iterate something
it returns undefined , side effects are logging 

ex:
const num = [1,2,3,4]
num.forEach(n => console.log(n))

comparison with map,


map() vs forEach()
Both iterate over arrays, but they’re for different purposes:
Aspect	map()	forEach()
Returns	New array	undefined
Purpose	Transform data	Side effects (logging, etc.)
Chainable	Yes	No
Use when	You need the results	You just want to do something

map()

returns array

↓

forEach()

returns undefined

ex:

const numbers = [1, 2, 3]

// map: When you need a new array
const doubled = numbers.map(n => n * 2)
console.log(doubled)  // [2, 4, 6]

// forEach: When you just want to do something with each item
numbers.forEach(n => console.log(n))  // Logs 1, 2, 3

// ❌ WRONG: Using map for side effects (wasteful)
numbers.map(n => console.log(n))  // Creates unused array [undefined, undefined, undefined]

// ✓ CORRECT: Use forEach for side effects
numbers.forEach(n => console.log(n))