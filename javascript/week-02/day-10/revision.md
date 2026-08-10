map
→ transform

filter
→ select

reduce
→ accumulate

find
→ first match

some
→ at least one

every
→ all

forEach
→ iterate / side effects

call
→ execute now + individual args

apply
→ execute now + array args

bind
→ return new function

Promise.all
→ wait for all
→ preserve input order
→ reject if one rejects




flow for today goal,


                    DAY 10
              ADVANCED POLYFILLS
                     │
                     ▼
             What is a Polyfill?
                     │
                     ▼
              ARRAY POLYFILLS
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
      map          filter        reduce
       │             │             │
       ▼             ▼             ▼
   forEach         find       some / every
                     │
                     ▼
             FUNCTION POLYFILLS
                     │
              ┌──────┼──────┐
              ▼      ▼      ▼
            call   apply   bind
              │      │      │
              └──────┼──────┘
                     ▼
             PROMISE POLYFILL
                     │
                     ▼
                Promise.all
                     │
                     ▼
               EDGE CASES
                     │
                     ▼
             INTERVIEW QUESTIONS
                     │
                     ▼
              CODING PRACTICE
                     │
                     ▼
             REACT CONNECTION
                     │
                     ▼
                  REVIEW
                     │
                     ▼
                  COMMIT