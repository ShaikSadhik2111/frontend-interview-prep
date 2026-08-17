//1. create a types function below one.
// calculateTotal(
//     price,
//     quantity
// )
// price → number
// quantity → number
// return → number

function calculateTotal(price: number, quantity: number): number {
    return price * quantity;
}

//2. create 
//user 
//with the following properties
// id
// name
// email
// age
//then create two users by using object and interface
//interface
interface User {  
    id: number;
    name: string;
    email: string;
    age: number;
}
const user1: User = {
    id: 1,
    name: "Alice",
    email: "123@gmail.com",
    age: 25
};

const user2: User = {
    id: 2,
    name: "Bob",
    email: "456@gmail.com",
    age: 30
};


//object type
type UserObject = {
    id: number; 
    name: string;
    email: string;
    age: number;
};

const user3: UserObject = {
    id: 3,
    name: "Charlie",
    email: "123@gmail.com",
    age: 28
};

//3. create getStatusMessage(status)
//where status can only be :
// "loading"
// "success"
// "error"
//Return an appropriate message.

type status = 'loading' | 'success' | 'error'
function getStatusMessage(
    variant: status
) {}


//4. type narrowing 
function formatId(
    id: number | string
) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id.toFixed(0));
    }
}

//5. use unknown example
function parseValue(value: unknown): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else if (typeof value === 'number') {
    return value.toFixed(0);
  } else if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  return 'unsupported type';
}