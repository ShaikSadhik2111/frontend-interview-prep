import React,{useCallback,useMemo,useState} from 'react';
type Product={id:number;name:string;price:number};
const products:Product[]=[{id:1,name:'Keyboard',price:2500},{id:2,name:'Mouse',price:1200},{id:3,name:'Monitor',price:18000}];
const ProductList=React.memo(function ProductList({items,onSelect}:{items:Product[];onSelect:(id:number)=>void}){return <ul>{items.map(p=><li key={p.id}><button onClick={()=>onSelect(p.id)}>{p.name} — ₹{p.price}</button></li>)}</ul>});
export default function Basics(){const[q,setQ]=useState('');const[count,setCount]=useState(0);const filtered=useMemo(()=>products.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())),[q]);const onSelect=useCallback((id:number)=>console.log(id),[]);return <section><input value={q} onChange={e=>setQ(e.target.value)}/><button onClick={()=>setCount(c=>c+1)}>Count: {count}</button><ProductList items={filtered} onSelect={onSelect}/></section>}
