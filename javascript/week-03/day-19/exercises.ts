// 1 partial
//Make UserUpdate allow any subset of User.
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

type UserUpdate = Partial<User>;
 const update: UserUpdate = {
    name: "John Doe",
    age: 30,
 };

 //2. pick
type UserPreview = Pick<User, "id" | "name">;
const preview: UserPreview = {
    id: 1,
    name: "John Doe",
};


//3. omit
//It should contain everything except: email
type publicUser = Omit<User, "email">;
const publicUser: publicUser = {
    id: 1,
    name: "John Doe",
    age: 30,
};

//4. record
type Status = "loading" | "success" | "error";
type StatusMessages = Record<Status, string>;
const statusMessages: StatusMessages = {
    loading: "Loading...",
    success: "Data fetched successfully!",
    error: "An error occurred.",
};

//5. Exclude
//expected output: "user" | "guest"
type Role = "admin" | "user" | "guest";
type NonAdminRole = Exclude<Role, "admin">;
const userRole: NonAdminRole = "user"; // Valid
const guestRole: NonAdminRole = "guest"; // Valid
// const adminRole: NonAdminRole = "admin"; // Error: Type '"admin"' is not assignable to type 'NonAdminRole'.  

//6. Extract
//"user" | "guest" //op
type UserRole = Extract<Role, "user" | "guest">;
const userRoleExtract: UserRole = "user";
const guestRoleExtract: UserRole = "guest";

//7. nonNullable
type ApiUser =
    | {
        id: number;
        name: string;
      }
    | null
    | undefined;

type ValidUser = NonNullable<ApiUser>;
const validUser: ValidUser = {
    id: 1,
    name: "John Doe",
};

//8 return type
function createProduct() {
    return {
        id: 1,
        name: "Laptop",
        price: 50000
    };
}

//create a product type without manually rewriting the object shape.

function createProductType(): ReturnType<typeof createProduct> {
    return {
        id: 1,
        name: "Laptop",
        price: 50000
    };
}


//9. parameters
function createOrder(
    productId: number,
    quantity: number,
    coupon?: string
) {
    // ...
}

//Extract its parameter tuple into:

type OrderParameters = Parameters<typeof createOrder>;
const orderParams: OrderParameters = [1, 2, "DISCOUNT10"];

//challenge

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    age: number;
}

//create this types
// type UserUpdate = ???;
// type PublicUser = ???;
// type UserPreview = ???;
//requirements
// UserUpdate

// everything optional

// PublicUser

// everything except password

// UserPreview

// only id, name

// This single exercise combines the three most practical object utility types.

type UserUpdate2 = Partial<User>;
type PublicUser = Omit<User, "password">;
type UserPreview2 = Pick<User, "id" | "name">;