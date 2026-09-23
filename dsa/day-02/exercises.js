// DSA Day 2 — Exercises
//
// Attempt first. Reference solutions are below.
// Do not memorize the code; identify the hashing pattern.

function characterFrequency(text) {
  const counts = new Map();

  for (const character of text) {
    counts.set(character, (counts.get(character) ?? 0) + 1);
  }

  return counts;
}

function areAnagrams(first, second) {
  if (first.length !== second.length) return false;

  const counts = new Map();

  for (const character of first) {
    counts.set(character, (counts.get(character) ?? 0) + 1);
  }

  for (const character of second) {
    const count = counts.get(character);

    if (count === undefined) return false;

    if (count === 1) counts.delete(character);
    else counts.set(character, count - 1);
  }

  return counts.size === 0;
}

function firstUniqueCharacter(text) {
  const counts = characterFrequency(text);

  for (let index = 0; index < text.length; index += 1) {
    if (counts.get(text[index]) === 1) return index;
  }

  return -1;
}

function containsDuplicate(numbers) {
  const seen = new Set();

  for (const number of numbers) {
    if (seen.has(number)) return true;
    seen.add(number);
  }

  return false;
}

function twoSum(numbers, target) {
  const seen = new Map();

  for (let index = 0; index < numbers.length; index += 1) {
    const complement = target - numbers[index];

    if (seen.has(complement)) {
      return [seen.get(complement), index];
    }

    seen.set(numbers[index], index);
  }

  return undefined;
}

function intersection(first, second) {
  const secondSet = new Set(second);
  const result = new Set();

  for (const value of first) {
    if (secondSet.has(value)) result.add(value);
  }

  return [...result];
}

module.exports = {
  characterFrequency,
  areAnagrams,
  firstUniqueCharacter,
  containsDuplicate,
  twoSum,
  intersection,
};
