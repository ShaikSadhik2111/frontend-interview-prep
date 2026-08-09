Reference
   ↓
Same object

Shallow Copy
   ↓
New top-level object
   ↓
Nested references shared

Deep Copy
   ↓
Nested structures copied

Object.assign()
   ↓
Shallow

Spread (...)
   ↓
Shallow

structuredClone()
   ↓
Deep clone for supported values

freeze()
   ↓
No add/delete/modify
   ↓
Shallow

seal()
   ↓
No add/delete
   ↓
Modify existing properties

Object.create()
   ↓
Prototype relationship