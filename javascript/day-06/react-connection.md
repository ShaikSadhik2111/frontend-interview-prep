## React Connection

### Where do we use `map()`?

- Rendering lists
- Rendering cards from API data
- Rendering menu items, tabs, or table rows

### Why?

`map()` is used when we want to transform each item into JSX.

```javascript
{users.map(user => (
	<li key={user.id}>{user.name}</li>
))}
```

### Where do we use `filter()`?

- Search
- Filtering table
- Showing only active items, completed tasks, or selected categories

### Why?

`filter()` is used when we want to keep only matching items before rendering.

```javascript
const visibleUsers = users.filter(user =>
	user.name.toLowerCase().includes(searchTerm.toLowerCase())
)
```

### Where do we use `reduce()`?

- Calculating totals
- Shopping cart
- Analytics
- Grouping data by category or status

### Why?

`reduce()` is used when multiple values need to be combined into one value.

```javascript
const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)
```

### Where do we use `find()`?

- Getting one selected item
- Finding the active user
- Getting the first matching record from a list

### Why?

`find()` is useful when we only need the first matching result, not the full list.

```javascript
const selectedUser = users.find(user => user.id === selectedId)
```

### Where do we use `some()`?

- Checking if at least one item is selected
- Checking if any validation rule fails
- Checking if any cart item is out of stock

### Why?

`some()` helps answer yes/no questions about a collection.

```javascript
const hasError = fields.some(field => field.error)
```

### Where do we use `every()`?

- Checking if all fields are valid
- Checking if all required checkboxes are selected
- Checking if every product meets a condition

### Why?

`every()` is useful when all items must satisfy the same rule.

```javascript
const allValid = fields.every(field => field.isValid)
```

### Where do we use `flat()` and `flatMap()`?

- Flattening nested API response data
- Normalizing nested arrays before rendering
- Mapping and flattening nested results in one step

### Why?

`flat()` removes nesting, while `flatMap()` maps first and then flattens one level.

```javascript
const tags = posts.flatMap(post => post.tags)
```

### Where do we use `forEach()`?

- Logging values during debugging
- Triggering side effects
- Updating non-UI state during iteration

### Why?

`forEach()` is best when we do not need a returned array.

### Useful React pattern summary

- `map()` for rendering JSX
- `filter()` for search and conditional lists
- `reduce()` for totals and derived values
- `find()` for one matching item
- `some()` for checking if any item matches
- `every()` for checking if all items match
- `flat()` / `flatMap()` for nested data normalization

