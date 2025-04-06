"use client"

const StringExercises = () => {
    const text = "Hello, World!";

    // 1. Inverter a string
    const reverseString = () => {
        return text.split('').reverse().join('');
        // "Hello" → ["H","e","l","l","o"] → ["o","l","l","e","H"] → "olleH"
    };

    // 2. Contar vogais
    const countVowels = () => {  // Declara uma função chamada countVowels sem parâmetros
        return text              // Pega a string guardada na variável 'text'
            .split('')        // Divide a string em um array de caracteres individuais
            // Exemplo: "Hello" → ["H", "e", "l", "l", "o"]
            .filter(char =>   // Filtra cada caractere do array
                'hH'   // String contendo todas as vogais (maiúsculas e minúsculas)
                    .includes(char) // Verifica se o caractere atual está nas vogais
                // Se sim, mantém no array; se não, remove
            ).length;        // Conta quantos caracteres restaram no array filtrado
        // Retorna esse número (quantidade de vogais)
    };

    // 3. Verificar se é palíndromo (ignorar maiúsculas e símbolos)
    const isPalindrome = () => {
        // 1. Normalize the original string: convert to lowercase and remove non-letters
        const cleanText = text.toLowerCase().replace(/[^a-z]/g, '');

        // 2. Create the reversed version of the cleaned string
        const reversedText = cleanText.split('').reverse().join('');

        // 3. Compare the cleaned original with the reversed version
        return cleanText === reversedText;
    };

    return (
        <div>
            <h2>String Exercises</h2>
            <div>Original: "{text}"</div>
            <div>reverseString: {reverseString()}</div>
            <div>countVowels: {countVowels()}</div>
            <div>Is palindrome: {isPalindrome() ? "✅ Yes" : "❌ No"}</div>
        </div>
    );
};

export default StringExercises
