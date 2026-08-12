# Day 11 React / Frontend Connection

## map()
Used frequently to transform data and render lists in React.

```js
users.map(user => <UserCard key={user.id} user={user} />)
```

## filter()
Useful for filtering UI data before rendering.

## reduce()
Useful for aggregation and derived data.

Example:

```js
const usersById = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
}, {});
```

## Object / Hash Map
Useful for indexing data by ID or another stable key for fast lookup.

## Promise.all()
Useful when multiple independent API requests can execute in parallel.

```js
const [users, products] = await Promise.all([
    getUsers(),
    getProducts()
]);
```

## Closures
Closures are important for utility functions that retain private state, such as counters and once(). They also help understand how stateful functions work in frontend code.

## Immutability
Methods such as `map()` and `filter()` return new arrays, which fits React's immutable state-update model.

## Interview connection
For frontend interviews, be ready to explain not only how a solution works, but why a particular data structure or array method is appropriate for the UI use case.
