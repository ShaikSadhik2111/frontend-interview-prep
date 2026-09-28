import React,{useCallback,useMemo,useState} from 'react';
type Employee={id:number;name:string;department:string};
const employees:Employee[]=[{id:1,name:'Asha',department:'UI'},{id:2,name:'Rahul',department:'Backend'},{id:3,name:'Meera',department:'UI'}];
const EmployeeRow=React.memo(function EmployeeRow({employee,onSelect}:{employee:Employee;onSelect:(id:number)=>void}){return <button onClick={()=>onSelect(employee.id)}>{employee.name}</button>});
export function Solution(){const[q,setQ]=useState('');const filtered=useMemo(()=>employees.filter(e=>e.name.toLowerCase().includes(q.toLowerCase())),[q]);const onSelect=useCallback((id:number)=>console.log(id),[]);return <>{<input value={q} onChange={e=>setQ(e.target.value)}/>} {filtered.map(e=><EmployeeRow key={e.id} employee={e} onSelect={onSelect}/>)}</>}
// 3: dependencies are [price, quantity]. 5: object literals create new references. 6: profile, optimize, profile again.
