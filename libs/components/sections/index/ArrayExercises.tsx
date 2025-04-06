"use client"

const ArrayExercises = () => {
  // Dado este array:
  const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5];

  // 1. Encontre o maior número
  const findMax = () => {
    return Math.max(...numbers)
  };

  // 2. Ordene o array em ordem decrescente
  const sortDescending = () => {
    return [...numbers].sort().reverse();
    // [3, 1, 4, 1, 5, 9, 2, 6, 5] → [9, 6, 5, 5, 4, 3, 2, 1, 1]
  };

  // 3. Remova valores duplicados
  const removeDuplicates = () => {  // Declares a function called removeDuplicates with no parameters
    return numbers.filter(        // Returns a new array created by filtering 'numbers'
      (num, index) => {        // Arrow function that takes current element (num) and its position (index)
        return numbers.indexOf(num) === index;  // The filter condition:
        // "Is this the FIRST time this number appears?"
      }
    );
  };

  return (
    <div>
      <h2>Array Exercises</h2>
      <div>Original: {numbers.join(', ')}</div>
      <div>findMax: {findMax()}</div>
      <div>sortDescending: {sortDescending()}</div>
      <div>removeDuplicates: {removeDuplicates()}</div>
    </div>
  );
};

export default ArrayExercises
