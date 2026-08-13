Architecture deesign of todo application,

Assume, this todo application I am implementing in react,

Intial phase of desiging,

think,

for todo app,

Todo App
│
├── TodoInput
│   ├── input
│   └── Add button
│
├── TodoList
│   └── TodoItem
│       ├── checkbox
│       ├── title
│       ├── edit
│       └── delete
│
└── TodoFilters
    ├── All
    ├── Active
    └── Completed

For state management need to identify where all needed,
todos,
in filter,
inputvalues,
when editing todo

Data flow,

App
 │
 ├── TodoInput
 │       ↓
 │    addTodo()
 │
 ├── TodoList
 │       ↓
 │    updateTodo()/editTodo()/any operations comes here
 │
 └── TodoFilters
         ↓
      setFilter()/fetch filter data/filter stuff goes here

design,

                    TODO APP
                       │
       ┌───────────────┼────────────────┐
       │               │                │
    Create           Manage          Filter
       │               │                │
       ▼               ▼                ▼
   Add Todo       Complete Todo       All
                  Edit Todo            Active
                  Delete Todo          Completed


Finalize the features,

✅ Add todo
✅ Delete todo
✅ Complete/uncomplete todo
✅ Edit todo
✅ Filter: All / Active / Completed
✅ Todo count
✅ Empty state
✅ Prevent empty todos


for state vs derived state,

Note: In React, state is the essential data that a component owns and mutates over time, while derived state is data calculated on the fly during rendering from existing state or props without being stored independently.

suppose,

const [todos, setTodos] = useState([]);
const [filter, setFilter] = useState("all");

should not do,

const [filteredTodos, setFilteredTodos] = useState([]);  -- this will be derived

so instead,

const filteredTodos = todos.filter(todo => {
    if (filter === "active") {
        return !todo.completed;
    }

    if (filter === "completed") {
        return todo.completed;
    }

    return true;
});

think,

State
 ↓
Derived data

not this,

State
 ↓
More state
 ↓
Synchronization problems

do this,

Immutability,

to add,

setTodos(prev => [
    ...prev,
    newTodo
]);

to delete,

setTodos(prev =>
    prev.filter(todo => todo.id !== id)
);

to update,
setTodos(prev =>
    prev.map(todo =>
        todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
    )
);

dont do,
todos.push(newTodo); or todo.completed = true;


component architecture,

   TodoApp
    │
    ├── TodoForm
    │
    ├── TodoStats
    │
    ├── TodoFilters
    │
    └── TodoList
        │
        └── TodoItem

    Todo app? what this will do?
    it owns,
    todos
    filter
    search

    TodoForm,
    responsible for,
    input
    validation
    submit

    TodoFilters,
    responsible for,
    All
    Active
    Completed

    TodoStats
    displays,
    Total
    Active
    Completed


    TodoList,
    this renders the filtered tools.


    TodoItem,
    resnponsible for,
    checkbox
    edit
    delete


Data model,

{
    id: crypto.randomUUID(),
    title: "Learn React",
    completed: false
}

state design,

start with this,

const [todos, setTodos] = useState([]);
const [filter, setFilter] = useState("all");

add search,

const [search, setSearch] = useState("");

dont go with this,

const [activeTodos, setActiveTodos] = useState([]);
const [completedTodos, setCompletedTodos] = useState([]);

this are derived values.

derived data,

const filteredTodos = todos.filter(todo => {
    const matchesFilter =
        filter === "all" ||
        (filter === "active" && !todo.completed) ||
        (filter === "completed" && todo.completed);

    const matchesSearch =
        todo.title
            .toLowerCase()
            .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
});

then,

const activeCount =
    todos.filter(todo => !todo.completed).length;

const completedCount =
    todos.filter(todo => todo.completed).length;


questioning phase ......lets answer here

Why shouldn't you store filteredTodos in state?
reason,

todos + filter
       ↓
filteredTodos

lets say if we store all this,

todos
filter
filteredTodos

now we have to keep three pieces of state  synchronized.
this will create unnessecary complexity and possible bugs.

and this filtered todo data is derived state which means this data no nee dto store all time , this based on run time query,
so once the requirement satisfies then we can remove this data.

Empty states,

this can be handled in Ui,
intially no todos present ,

so No todos -> then add 1st todo

no matching filter -> no active todos  so search retuns nothing.


Validations,

dont take empty todos , " " / ' '/ ""/''

we need handle tis validations while in input.

code,

const trimmedTitle = title.trim();

if (!trimmedTitle) {
    return;
}

then store:

trimmedTitle

rather than the raw input.

Performance ,

how application handles 100000+ requests?

will use momoization topic here,

so to handle this will use,

React.memo
useMemo
useCallback
virtualization


means we should not useMemo evrywhere based on need we nee dto use above handlings.


general answer we can say this,

I would first establish that there is a measurable performance problem, then optimize the relevant rendering or computation.

coming to accessibility,

for button, inputs, checkboxes all this should  have meaning label ,

ex::

<button aria-label="Delete todo">
    Delete
</button>

<button aria-label={`Edit ${todo.title}`}>
    ✏️
</button>

also

Input → label
Buttons → keyboard accessible
Checkbox → proper label


This is how we can design the system