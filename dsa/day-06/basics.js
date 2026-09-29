// DSA Day 6 — Stack and Queue Basics

function isValidParentheses(value) {
  const stack = [];
  const matching = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const char of value) {
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
      continue;
    }

    if (matching[char] && stack.pop() !== matching[char]) {
      return false;
    }
  }

  return stack.length === 0;
}

function createQueue() {
  const items = [];
  let front = 0;

  return {
    enqueue(value) {
      items.push(value);
    },

    dequeue() {
      if (front >= items.length) {
        return undefined;
      }

      const value = items[front];
      front += 1;
      return value;
    },

    peek() {
      return items[front];
    },

    isEmpty() {
      return front >= items.length;
    },
  };
}

console.log(isValidParentheses("({[]})"));
console.log(isValidParentheses("([)]"));

const queue = createQueue();
queue.enqueue("A");
queue.enqueue("B");
console.log(queue.dequeue()); // A
console.log(queue.peek()); // B
