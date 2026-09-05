export {};

// 1. User Profile
// create two users
interface UserProfile {
  readonly id: number;
  name: string;
  email: string;
  age: number;
}

const user1: UserProfile = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 25,
};

const user2: UserProfile = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
  age: 30,
};

user1.name = "Alice Smith"; // Update user1's name

//op: Cannot assign to 'id' because it is a read-only property.

// 2. Extend interface

interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  permissions: string[];
}

const admin: Admin = {
  id: 3,
  name: "Charlie",
  permissions: ["manage-users", "manage-settings"],
};

//3. Type alias for a union type
type Status = "loading" | "success" | "error";

let currentStatus: Status = "loading"; //no error
let anotherStatus: Status = "pending"; // Error: Type '"pending"' is not assignable to type 'Status'.

//4. intersection 
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: number;
};

type EmployeeProfile = Person & Employee;

const employee: EmployeeProfile = {
    name: "David",
    age: 35,
    employeeId: 12345,
};

//5. practical example
interface Product {
    readonly id: number;
    name: string;
    price: number;
    description?: string;
    category: Category;
    status: ProductStatus;
}

type Category = "electronics" | "clothing" | "books";
type ProductStatus = "in-stock" | "out-of-stock" | "discontinued";

//3 products
const product1: Product = {
    id: 1,
    name: "Smartphone", 
    price: 699.99,
    category: "electronics",
    status: "in-stock",
};

const product2: Product = {
    id: 2,
    name: "T-shirt",
    price: 19.99,
    category: "clothing",
    status: "out-of-stock",
};

const product3: Product = {
    id: 3,
    name: "Book",
    price: 14.99,
    category: "books",
    status: "discontinued",
};

