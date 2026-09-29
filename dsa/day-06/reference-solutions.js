// DSA Day 6 — Reference Solutions

function minStack() {
  const values = [];
  const minimums = [];

  return {
    push(value) {
      values.push(value);

      const currentMin =
        minimums.length === 0
          ? value
          : Math.min(value, minimums[minimums.length - 1]);

      minimums.push(currentMin);
    },

    pop() {
      if (values.length === 0) return undefined;

      minimums.pop();
      return values.pop();
    },

    top() {
      return values[values.length - 1];
    },

    getMin() {
      return minimums[minimums.length - 1];
    },
  };
}

function nextGreaterElements(numbers) {
  const result = Array(numbers.length).fill(-1);
  const stack = [];

  for (let i = 0; i < numbers.length; i += 1) {
    while (
      stack.length > 0 &&
      numbers[i] > numbers[stack[stack.length - 1]]
    ) {
      const index = stack.pop();
      result[index] = numbers[i];
    }

    stack.push(i);
  }

  return result;
}

function evaluatePostfix(expression) {
  const stack = [];

  for (const token of expression.trim().split(/\s+/)) {
    if (!Number.isNaN(Number(token))) {
      stack.push(Number(token));
      continue;
    }

    const right = stack.pop();
    const left = stack.pop();

    if (left === undefined || right === undefined) {
      throw new Error("Invalid postfix expression");
    }

    if (token === "+") stack.push(left + right);
    else if (token === "-") stack.push(left - right);
    else if (token === "*") stack.push(left * right);
    else if (token === "/") stack.push(left / right);
    else throw new Error("Unsupported operator: " + token);
  }

  if (stack.length !== 1) {
    throw new Error("Invalid postfix expression");
  }

  return stack[0];
}

module.exports = {
  minStack,
  nextGreaterElements,
  evaluatePostfix,
};
