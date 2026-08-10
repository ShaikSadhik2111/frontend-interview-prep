map()
 ↓
Rendering lists

filter()
 ↓
Filtering UI data

reduce()
 ↓
Aggregating application data

some()
 ↓
Conditional UI

every()
 ↓
Validation

Promise.all()
 ↓
Parallel API requests


ex:

const [users, products] = await Promise.all([
    getUsers(),
    getProducts()
]);