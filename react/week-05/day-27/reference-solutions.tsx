import React, { useCallback, useMemo, useState } from "react";

type Employee = {
  id: number;
  name: string;
  department: string;
};

const employees: Employee[] = [
  { id: 1, name: "Asha", department: "UI" },
  { id: 2, name: "Rahul", department: "Backend" },
  { id: 3, name: "Meera", department: "UI" },
];

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

export function Solution() {
  const [query, setQuery] = useState("");

  const filteredEmployees = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    return employees.filter((employee) =>
      employee.name.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  const handleSelect = useCallback((id: number) => {
    console.log("Selected employee:", id);
  }, []);

  return (
    <>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search employees"
      />

      {filteredEmployees.map((employee) => (
        <EmployeeRow
          key={employee.id}
          employee={employee}
          onSelect={handleSelect}
        />
      ))}
    </>
  );
}

// Exercise 3:
// useMemo(() => price * quantity, [price, quantity])
//
// Exercise 5:
// An object literal creates a new object reference on every render.
// React.memo's shallow comparison therefore sees the prop as changed.
//
// Exercise 6:
// Profile first. Identify whether the bottleneck is row rendering,
// parent rendering, filtering/sorting, DOM size, or data fetching.
// Then choose the smallest targeted optimization and measure again.
