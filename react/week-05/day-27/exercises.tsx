import React from "react";

type Employee = {
  id: number;
  name: string;
  department: string;
};

// Exercise 1
// Decide whether useMemo is justified for a large filtered employee list.
// Explain what you would measure before adding it.

// Exercise 2
// Create a memoized row and a stable callback.
// Then explain what happens if useCallback is removed.

// Exercise 3
// Fix the dependency array:
//
// useMemo(() => price * quantity, []);
//
// Expected dependency array: [price, quantity]

// Exercise 4
// Which callbacks actually need stable identity?
// Give a concrete React.memo example.

// Exercise 5
// Explain why this can defeat React.memo:
//
// <Child options={{ sort: "asc" }} />

// Exercise 6
// Create a measurement-first plan for a slow 5000-row table.
// Consider:
// - React Profiler
// - row rendering
// - unstable props
// - filtering/sorting
// - virtualization
// - pagination
// - server-side processing

type EmployeeRowProps = {
  employee: Employee;
  onSelect: (id: number) => void;
};

const EmployeeRow = React.memo(function EmployeeRow({
  employee,
  onSelect,
}: EmployeeRowProps) {
  return (
    <button onClick={() => onSelect(employee.id)}>
      {employee.name}
    </button>
  );
});

export { EmployeeRow };
