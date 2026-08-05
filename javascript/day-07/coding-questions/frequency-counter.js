// frequency counter without using any methods
function frequencyCounter(str) {
    const freq = {};
    for(let i = 0; i < str.length; i++) {
        const char = str[i];
        if(freq[char]) {
            freq[char] += 1;
        } else {
            freq[char] = 1;
        }
    }
    return freq;
}

console.log(frequencyCounter("hello world"));

//by using inbuilt methods
const frequencyCounterWithMethods = (str) => {
    const freq = {};
    str.split("").forEach(char => {
        freq[char] = (freq[char] || 0) + 1;
    });
    return freq;
};
console.log(frequencyCounterWithMethods("hello world"));