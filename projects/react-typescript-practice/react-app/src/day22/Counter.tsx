
import { useState } from "react";


function Counter() {
    const [count, setCount] = useState(0);
    

    const controlCount = (value: number) => {
        
        setCount(count + value);
        if (count + value === 0) {
            setCount(1);//count should not go below zero
        }
        
        
    };
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => controlCount(1)}>Increment</button>
            <button onClick={() => controlCount(-1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}

export default Counter;