// DSA Day 2 — Strings + Hashing

// 1. Character frequency
// Time: O(n)
// Auxiliary space: O(k), where k = number of distinct characters.
function characterFrequency(text) {
  const counts = new Map();

  for (const character of text) {
    counts.set(character, (counts.get(character) ?? 0) + 1);
  }

  return counts;
}

// 2. Anagram check
// Same frequency for every character => anagrams.
// Time: O(n + m)
// Auxiliary space: O(k)
function areAnagrams(first, second) {
  if (first.length !== second.length) return false;

  const counts = new Map();

  for (const character of first) {
    counts.set(character, (counts.get(character) ?? 0) + 1);
  }

  for (const character of second) {
    const count = counts.get(character);

    if (count === undefined) return false;

    if (count === 1) {
      counts.delete(character);
    } else {
      counts.set(character, count - 1);
    }
  }

  return counts.size === 0;
}

// 3. Duplicate detection
// Set gives expected O(1) membership checks.
// Time: O(n), expected
// Auxiliary space: O(n)
function containsDuplicate(numbers) {
  const seen = new Set();

  for (const number of numbers) {
    if (seen.has(number)) return true;
    seen.add(number);
  }

  return false;
}

// 4. Two Sum
// Store numbers already seen and look for the complement.
// Time: O(n), expected
// Auxiliary space: O(n)
function twoSum(numbers, target) {
  const seen = new Map();

  for (let index = 0; index < numbers.length; index += 1) {
    const number = numbers[index];
    const complement = target - number;

    if (seen.has(complement)) {
      return [seen.get(complement), index];
    }

    seen.set(number, index);
  }

  return undefined;
}

// 5. First unique character
// Time: O(n), expected
// Auxiliary space: O(k)
function firstUniqueCharacter(text) {
  const counts = characterFrequency(text);

  for (let index = 0; index < text.length; index += 1) {
    if (counts.get(text[index]) === 1) {
      return index;
    }
  }

  return -1;
}
