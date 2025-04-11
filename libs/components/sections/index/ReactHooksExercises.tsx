
import { useEffect, useRef, useState } from "react";

const ReactHooksExercises = () => {
  /*
    1. Crie um contador que aumente e diminua usando useState
    - Dica: use dois botões, um para ➕ e outro para ➖

    2. Simule uma chamada de API com useEffect que atualiza um estado com dados após 2 segundos
    - Dica: use setTimeout para simular o delay

    3. Use useRef para contar quantas vezes o componente foi renderizado
    - Dica: atualize o valor no useEffect

    4. Crie um useReducer com dois casos:
      - "TOGGLE": muda o estado booleano visível/invisível
      - "INCREMENT": soma +1 ao número de cliques

    5. Crie uma função com useCallback que retorna "Olá, NOME!" e só muda se o nome mudar

    6. Extra: Crie um input controlado com useState
    - Dica: faça um campo de texto onde o estado guarda o valor digitado

    7. Extra: Faça um cronômetro que aumenta 1 a cada segundo quando está "ligado"
    - Dica: use useEffect + setInterval + botão para start/pause

    8. Extra: useMemo para calcular o quadrado de um número digitado em um input
    - Dica: só recalcular quando o número mudar
  */

  const [count, setCount] = useState(0);
  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);

  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setData("✅ Dados carregados da API simulada!");
    }, 2000); // 2 segundos de "delay"

    // Limpeza opcional
    return () => clearTimeout(timeout);
  }, []);

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });
  

  return (
    <div>
      <h2>React Hooks Exercises</h2>
      <div>
        <h3>useState</h3>
        <p>Count: {count}</p>
        <button onClick={increase}>➕</button>
        <button onClick={decrease}>➖</button>
      </div>
      <h2>Simulação de API com useEffect</h2>
      <p>{data ? data : "⏳ Carregando..."}</p>

      <p>{ renderCount.current}</p>

    </div>
  );
};

export default ReactHooksExercises;
