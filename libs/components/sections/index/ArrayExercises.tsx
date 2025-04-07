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

  // 3. Remova valores duplicados (para arrays pequenos so)
  const removeDuplicates = () => {  // Declares a function called removeDuplicates with no parameters
    return numbers.filter(        // Returns a new array created by filtering 'numbers'
      (num, index) => {        // Arrow function that takes current element (num) and its position (index)
        return numbers.indexOf(num) === index;  // The filter condition:
        // "Is this the FIRST time this number appears?"
      }
    );
  };

  /*
  ORRRRRRR
  forma mais rapida (serve para arrays grandes )
  const removeDuplicates = () => Array.from(new Set(numbers));
  */

  const sumArray = () => {
    return [...numbers].reduce((total, num) => {
      return total + num
    }, 0);
  };

  const findUniqueElements = () => {
    // Define a função findUniqueElements que não recebe parâmetros
    return numbers.filter((num, index, arr) => {
      // Usa o método filter no array 'numbers' para criar um novo array
      // A função callback recebe:
      // - num: o elemento atual do array
      // - index: o índice do elemento atual (não usado nesta solução)
      // - arr: referência ao próprio array 'numbers' (melhor prática que usar 'numbers' diretamente)

      return arr.indexOf(num) === arr.lastIndexOf(num);
      // Para cada elemento 'num', verifica:
      // 1. arr.indexOf(num) -> retorna o PRIMEIRO índice onde 'num' aparece
      // 2. arr.lastIndexOf(num) -> retorna o ÚLTIMO índice onde 'num' aparece
      // 3. Compara se os dois índices são iguais
      //    - Se forem iguais: o número aparece APENAS UMA VEZ (mantém no array resultante)
      //    - Se diferentes: o número está duplicado (filtra/remove do resultado)
    });
  };

  const rotateArray = (positions: number) => {
    // Garante que o número de rotações não ultrapasse o tamanho do array
    // Por exemplo, se positions = 10 e o array tem 9 elementos, isso vira 1
    positions = positions % numbers.length;

    // Cria um novo array chamado 'rotated' juntando duas partes:
    const rotated = [
      // 1. Pega os últimos 'positions' elementos do array
      // Ex: se positions = 3, isso retorna os últimos 3 elementos
      ...numbers.slice(-positions),

      // 2. Pega os elementos restantes do começo do array até a parte que foi movida
      // Isso garante que os elementos deslocados para a direita sejam substituídos corretamente
      ...numbers.slice(0, numbers.length - positions),
    ];

    // Retorna o novo array rotacionado
    return rotated;
  };

  const numbers2 = [1, 2, 3, 7, 8];
  const findIntersection = () => {
    return numbers.filter(cadaElemento => numbers2.includes(cadaElemento));
  };

  const nestedArray = [1, [2, [3, 4], 5]];
  const flattenArray = () => {
    return nestedArray.flat(2)
    //nestedArray.flat(Infinity) Se não souber quantos níveis existem usar infinity
  };

  // Função para encontrar a maior soma de subarray contíguo
  const findMaxSubarraySum = () => {
    // Inicializa 'maxSum' com um valor muito baixo (inicialmente, o menor valor possível)
    let maxSum = -Infinity;

    // Inicia um loop para iterar sobre todos os elementos do array 'numbers'
    for (let i = 0; i < numbers.length; i++) {
      // 'currentSum' vai acumular a soma de elementos para cada subarray iniciado no índice 'i'
      let currentSum = 0;

      // Inicia outro loop, começando no índice 'i', para ir acumulando a soma dos elementos do subarray
      for (let j = i; j < numbers.length; j++) {
        // Adiciona o valor de 'numbers[j]' à soma atual do subarray
        currentSum += numbers[j];

        // Se a soma do subarray atual for maior do que a maior soma registrada até agora
        if (currentSum > maxSum) {
          // Atualiza 'maxSum' com a nova maior soma
          maxSum = currentSum;
        }
      }

      // **Problema**: Retorno está aqui dentro do loop, ou seja, ele vai sair na primeira iteração.
      return maxSum;  // Retorna o valor de 'maxSum' imediatamente após a primeira iteração
    }
  };

  const parentheses = ['(', '(', ')', ')', '('];

  const isBalanced = () => {
    // Cria uma pilha vazia para armazenar os parênteses abertos '('
    const stack = [];

    // Itera sobre cada elemento no array de parênteses
    for (let i = 0; i < parentheses.length; i++) {
      // Pega o caractere atual do array de parênteses
      const char = parentheses[i];

      // Se o caractere for um parêntese de abertura '('
      if (char === '(') {
        // Empurra o parêntese de abertura '(' para a pilha
        stack.push(char);
      }

      // Se o caractere for um parêntese de fechamento ')'
      else if (char === ')') {
        // Verifica se a pilha está vazia. Se estiver vazia, significa que não há um '(' correspondente para fechar
        if (stack.length === 0) {
          return false;  // Retorna 'false' porque o parêntese de fechamento não tem um correspondente de abertura
        }
        // Se não estiver vazia, remove o '(' da pilha, já que encontrou o parêntese correspondente de fechamento
        stack.pop();
      }
    }

    // Se a pilha estiver vazia no final, significa que todos os parênteses de abertura tiveram um par correspondente de fechamento
    return stack.length === 0;
  };

  return (
    <div>
      <h2>Array Exercises</h2>
      <div>Original: {numbers.join(', ')}</div>
      <div>findMax: {findMax()}</div>
      <div>sortDescending: {sortDescending()}</div>
      <div>removeDuplicates: {removeDuplicates()}</div>
      <div>sumArray: {sumArray()}</div>
      <div>findUniqueElements: {findUniqueElements()}</div>
      <div>rotateArray: {rotateArray(1)}</div>
      <div>findIntersection: {findIntersection()}</div>
      <div>flattenArray: {flattenArray()}</div>
      <div>findMaxSubarraySum: {findMaxSubarraySum()}</div>
      <div>isBalanced: {isBalanced() ? 'Balanceado' : 'Não balanceado'}</div>
    </div>
  );
};

export default ArrayExercises
