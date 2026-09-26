function maxSumOfSizeK(numbers, k) {
  if (k <= 0 || k > numbers.length) return null;

  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += numbers[i];

  let best = windowSum;
  for (let right = k; right < numbers.length; right++) {
    windowSum += numbers[right];
    windowSum -= numbers[right - k];
    best = Math.max(best, windowSum);
  }

  return best;
}

function longestUniqueSubstringLength(value) {
  const lastSeen = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < value.length; right++) {
    const char = value[right];

    if (lastSeen.has(char) && lastSeen.get(char) >= left) {
      left = lastSeen.get(char) + 1;
    }

    lastSeen.set(char, right);
    best = Math.max(best, right - left + 1);
  }

  return best;
}

// along with length and the actual substring

// function longestUniqueSubstring(value) {
//   const lastSeen = new Map();
//   let left = 0;
//   let best = 0;
//   let bestStart = 0;

//   for (let right = 0; right < value.length; right++) {
//     const char = value[right];

//     if (lastSeen.has(char) && lastSeen.get(char) >= left) {
//       left = lastSeen.get(char) + 1;
//     }

//     lastSeen.set(char, right);

//     const currentLength = right - left + 1;
//     if (currentLength > best) {
//       best = currentLength;
//       bestStart = left;
//     }
//   }

//   return {
//     substring: value.slice(bestStart, bestStart + best),
//     length: best
//   };
// }

// const result = longestUniqueSubstring('abcabcbb');
// console.log('Unique substring:', result.substring);
// console.log('Length:', result.length);

module.exports = { maxSumOfSizeK, longestUniqueSubstringLength };
