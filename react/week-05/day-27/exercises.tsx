import React from 'react';
type Employee={id:number;name:string;department:string};
// 1. Decide whether useMemo is justified for a large filtered employee list.
// 2. Create a memoized row and stable callback; explain removing useCallback.
// 3. Fix: useMemo(()=>price*quantity,[])
// 4. Which callbacks actually need stable identity?
// 5. Why does an inline object defeat shallow comparison?
// 6. Write a measurement-first plan for a slow 5000-row table.
const EmployeeRow=React.memo(function EmployeeRow({employee,onSelect}:{employee:Employee;onSelect:(id:number)=>void}){return <button onClick={()=>onSelect(employee.id)}>{employee.name}</button>});
export {EmployeeRow};
