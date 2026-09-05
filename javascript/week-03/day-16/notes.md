Topic:

Interfaces
Type Aliases
Optional Properties
Readonly Properties
Extending Interfaces
Intersection Types
Practical Frontend Typing

<!-- 1 interfaces -->

It decribes the shape of an object

ex:

interface {
    id: number;
    name:string;
    email:string
}

//used like this
const user: user = {
    id: 1;
    name:"sadhil";
    email:"123@gmail.com";
};

User
│
├── id     → number
├── name   → string
└── email  → string

<!-- optional properties -->
sometimes property may not needed or always no need to be exist so,


ex:

interface User {
    id: number;
    name: string;
    email?: string;
}


const user1: User = {
    id: 1,
    name: "Sadhik"
};

const user2: User = {
    id: 2,
    name: "John",
    email: "john@example.com"
};

note:

email?: string;


<!-- 3 readonly properties -->

interface User {
    readonly id: number;
    name: string;
}

valid case:

const user: User = {
    id: 1,
    name: "Sadhik"
};

user.name = "Updated Name"; // ✅

invalid:

user.id = 2; // ❌

in react usage:

interface Product {
    readonly id: number;
    name: string;
    price: number;
}

<!-- 4 extending interfaces -->

lets have:

interface User {
    id: number;
    name: string;
}

lets see emoluyee also user but it has some additional info

interface Employee extends User {
    department: string;
    salary: number;
}

now,

const employee: Employee = {
    id: 1,
    name: "Sadhik",
    department: "Engineering",
    salary: 50000
};


User
  ↑
Employee
  ├── department
  └── salary

  <!-- 5 type alias -->

  A type alias gives a name to type

  type User = {
    id: number;
    name: string;
};

which looks similar to interface,

interface User {
    id: number;
    name: string;
}

For object shapes, both can often work.

type alaid especially used for,

unions,

type Status = "loading" | "success" | "error";
type UserId = string | number;

function types,

type Calculate = (
    a: number,
    b: number
) => number;

<!-- Interface vs type alias -->

prefer always interface both has same structure,
generally interface used for,

object shapes
extending object contracts
declaration merging

where as type alias used for,

Union types
Intersection types
Primitive aliases
Tuples
Function signatures
Complex compositions

<!-- 6 intersection types -->
an intersection combines types


type User = {
    id: number;
    name: string;
};

type Admin = {
    permissions: string[];
};


type AdminUser = User & Admin;

now,

const admin: AdminUser = {
    id: 1,
    name: "Sadhik",
    permissions: ["read", "write"]
};


User
   +
Admin
   ↓
AdminUser

Note:

union:

A| B
means A or B

intersection 

A & B

so A and B

<!-- lets see practicle react example -->

havinga api respons elik ethis,

interface Product {
    readonly id: number;

    name: string;

    price: number;

    description?: string;

    category: Category;

    status: ProductStatus;
}

so now,

type can be use dlik ethis

type Category =
    | "electronics"
    | "clothing"
    | "books";

    type ProductStatus =
    | "active"
    | "inactive"
    | "out-of-stock";

    this can give protection to application


const product: Product = {
    id: 1,
    name: "Laptop",
    price: 50000,
    category: "electronics",
    status: "active"
};

if this case,

category: "random";

then TS can catch this , this proves TS act as a type safety provide in compilling phase it prevents the errors.