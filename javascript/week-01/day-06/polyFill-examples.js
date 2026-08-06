// Here are some polyfill examples for JavaScript features that may not be supported in older browsers or environments.
// myMap()
Array.prototype.myMap = function(callback){

const result=[];

for(let i=0;i<this.length;i++){

result.push(

callback(this[i],i,this)

);

}

return result;

}
// above one is polyfill for map() method which creates a new array populated with the results of calling a provided function on every element in the calling array.

// myFilter()
Array.prototype.myFilter = function(callback){

const result=[];
for(let i=0;i<this.length;i++){
if(callback(this[i],i,this)){
    result.at.push(this[i]);
}
return result;
}
}

// myReduce()
Array.prototype.myReduce = function(callback,initialValue){
let accumulator=initialValue;
for(let i=0;i<this.length;i++){
    accumulator=callback(accumulator,this[i],i,this);
}
return accumulator;
}       
