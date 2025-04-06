"use client"

const CombinedExercise = () => {
  const words = ["React", "TypeScript", "JavaScript", "HTML", "CSS"];

  // 1. Filtrar palavras com mais de 5 caracteres
  const filterLongWords = () => {
    return words.filter((word) => {
      return word.length > 5;
    }).length
  };

  console.log(words[0].length)
  console.log("JavaScript".length > 5);  // Deve retornar 'true'
  console.log("CSS".length > 5);        // Deve retornar 'false'

  // 2. Mapear para comprimentos [5, 10, 10, 4, 3]
  const mapToLengths = () => {
    return words.map((char) =>  (
      char.length
    ))
  };

  return (
    <div>
      <h2>Combined Exercises</h2>
      <div>Original: {words.join(', ')}</div>
      <div>filterLongWords: {filterLongWords()}</div>
      <div>reverseString: {mapToLengths()}</div>

    </div>
  );
};

export default CombinedExercise
