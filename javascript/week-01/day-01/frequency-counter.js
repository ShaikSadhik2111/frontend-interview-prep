function checkCountFrequency(arr) {
  const frequencyMap = {};
  for (const element of arr) {
    frequencyMap[element] = (frequencyMap[element] || 0) + 1;
  }
  return frequencyMap;
}
console.log(checkCountFrequency(["react","js","react","ts","js"]));

//alternate way
function checkCountFrequencyAlt(arr) {
  const frequencyMap = {};
    for (const element of arr) {
        if (frequencyMap[element]) {
            frequencyMap[element]++;
        } else {
            frequencyMap[element] = 1;
        }   

    }
    return frequencyMap;
}
console.log(checkCountFrequencyAlt(["react","js","react","ts","js"]));