//grp objs by using reduce method
//op
// {

// Hyd:[...]

// BLR:[...]

// }
const grp = [
 {name:"A",city:"Hyd"},
 {name:"B",city:"Hyd"},
 {name:"C",city:"BLR"}
];

// Goal:
// Convert this array into an object grouped by city.
// Final shape:
// {
//   Hyd: [{...}, {...}],
//   BLR: [{...}]
// }

// reduce() runs once for each array item.
// acc  -> accumulator object we keep building.
// curr -> current object from grp array.
// {}   -> initial value of acc (empty object at start).
const groupedA = grp.reduce((acc, curr) => {
    // Get city name from current object.
    // Example: curr = { name: "A", city: "Hyd" } => city = "Hyd"
    const city = curr.city;

    // If this city key does not exist in acc, create it with empty array.
    // First time Hyd appears: acc["Hyd"] = []
    if(!acc[city]) {
        acc[city] = [];
    }

    // Push current object into the city bucket.
    // Hyd bucket becomes:
    // [{name:"A", city:"Hyd"}] then [{name:"A",...}, {name:"B",...}]
    acc[city].push(curr);

    // Return updated accumulator for next iteration.
    return acc;
}, {});

// Final output:
// {
//   Hyd: [ {name:"A",city:"Hyd"}, {name:"B",city:"Hyd"} ],
//   BLR: [ {name:"C",city:"BLR"} ]
// }
console.log(groupedA);

//another ex
const grpT = [
 {name:"A",city:"Hyd", town:"Kukatpally"},
 {name:"B",city:"Hyd", town:"Miyapur"},
 {name:"C",city:"BLR", town:"Whitefield"},
];

const groupedB = grpT.reduce((acc, curr) => {
    const city = curr.town;
    if(!acc[city]) {
        acc[city] = [];
    }
    acc[city].push(curr);
    return acc;
}, {});

console.log(groupedB);

//simple way
const grpNew = [
 {name:"A",city:"Hyd", town:"Kukatpally"},
 {name:"B",city:"Hyd", town:"Miyapur"},
 {name:"C",city:"BLR", town:"Whitefield"},
];

// Same grouping logic in one short line:
// (acc[curr.town] = acc[curr.town] || []).push(curr)
//
// Breakdown:
// 1) acc[curr.town]
//    - Access current town bucket in accumulator.
//
// 2) acc[curr.town] || []
//    - If bucket exists, use it.
//    - If bucket does not exist, use [] as default.
//
// 3) acc[curr.town] = ...
//    - Save that bucket back to acc under the town key.
//
// 4) .push(curr)
//    - Push current object into that town bucket.
//
// So for each item, this line ensures the key exists, then appends the item.
const groupedC = grpNew.reduce((acc, curr) => {
    (acc[curr.town] = acc[curr.town] || []).push(curr);
    return acc;
}, {});

console.log(groupedC);