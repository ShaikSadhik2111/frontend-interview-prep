// TypeScript Day 19 - Utility Types

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

type UserUpdate = Partial<User>;
const update: UserUpdate = { name: "Sadhik" };

type CompleteUser = Required<Partial<User>>;
type ReadonlyUser = Readonly<User>;
type UserPreview = Pick<User, "id" | "name">;
type PublicUser = Omit<User, "email">;

type Status = "loading" | "success" | "error";
type StatusMessages = Record<Status, string>;
const statusMessages: StatusMessages = {
    loading: "Loading...",
    success: "Success!",
    error: "Something went wrong."
};

type Role = "admin" | "user" | "guest";
type NonAdminRole = Exclude<Role, "admin">;
type BasicRole = Extract<Role, "user" | "guest">;

type ApiUser = User | null | undefined;
type ValidUser = NonNullable<ApiUser>;

function createProduct() {
    return { id: 1, name: "Laptop", price: 50000 };
}
type Product = ReturnType<typeof createProduct>;

function createOrder(productId: number, quantity: number, coupon?: string): void {
    console.log(productId, quantity, coupon);
}
type OrderParameters = Parameters<typeof createOrder>;
const order: OrderParameters = [1, 2, "DISCOUNT10"];

console.log(update, statusMessages, order);
