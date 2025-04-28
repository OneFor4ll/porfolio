import { useState, useEffect, useRef, useReducer, useCallback, useMemo } from "react";

const ReactHooksExercises = () => {
  // 1. Contador com useState
  // Aumenta e diminui o contador
  const [count, setCount] = useState(0);
  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);

  // 2. Simulação de API com useEffect
  // Simula o carregamento de dados da API após 2 segundos
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setData("✅ Dados carregados da API simulada!");
    }, 2000); // 2 segundos de delay

    // Limpeza opcional: Limpa o timeout caso o componente seja desmontado
    return () => clearTimeout(timeout);
  }, []); // O array vazio garante que o efeito seja executado apenas uma vez

  // 3. Contador de renderizações com useRef
  // Conta quantas vezes o componente foi renderizado
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  // 4. useReducer para visibilidade e contagem de cliques
  // Alterna a visibilidade e conta o número de cliques
  const initialState = {
    visible: true,
    clicks: 0,
  };

  function reducer(state: typeof initialState, action: { type: "TOGGLE" | "INCREMENT" }) {
    switch (action.type) {
      case "TOGGLE":
        return { ...state, visible: !state.visible }; // Alterna visibilidade
      case "INCREMENT":
        return { ...state, clicks: state.clicks + 1 }; // Incrementa os cliques
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // 5. Função com useCallback para retornar "Olá, NOME!"
  // A função só mudará se o nome mudar
  const [name, setName] = useState("");
  const greet = useCallback(() => {
    return `Olá, ${name}!`;
  }, [name]); // Dependência de 'name' para memorizar a função

  // 6. Input controlado com useState
  // Atualiza o estado conforme o valor do input
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  // 7. Cronômetro com useEffect
  // Cronômetro que aumenta 1 a cada segundo quando "ligado"
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null; // Inicializamos a variável como null

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1); // Atualiza o timer a cada segundo
      }, 1000);
    } else if (interval) {
      clearInterval(interval); // Limpamos o intervalo se o cronômetro estiver pausado
    }

    // Limpeza do intervalo na desmontagem do componente ou quando isRunning mudar
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  // 8. useMemo para calcular o quadrado de um número
  // O quadrado só será recalculado quando o número mudar
  const [number, setNumber] = useState(0);
  const squared = useMemo(() => {
    console.log("Calculando..."); // Log para verificar quando o cálculo acontece
    return number * number;
  }, [number]); // Dependência de 'number' para memorizar o cálculo

  return (
    <div>
      <h2>React Hooks Exercises</h2>
      
      {/* 1. Contador */}
      <h3>useState - Contador</h3>
      <p>Count: {count}</p>
      <button onClick={increase}>➕</button>
      <button onClick={decrease}>➖</button>

      {/* 2. Simulação de API */}
      <h3>Simulação de API com useEffect</h3>
      <p>{data ? data : "⏳ Carregando..."}</p>

      {/* 3. Contador de renderizações */}
      <h3>useRef - Contador de Renderizações</h3>
      <p>{renderCount.current}</p>

      {/* 4. useReducer */}
      <h3>useReducer</h3>
      <p>Visível: {state.visible ? "✅ Sim" : "❌ Não"}</p>
      <p>Cliques: {state.clicks}</p>
      <button onClick={() => dispatch({ type: "TOGGLE" })}>Alternar Visibilidade</button>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Contar Clique</button>

      {/* 5. useCallback */}
      <h3>useCallback - Olá, {name}</h3>
      <input type="text" value={name} onChange={handleNameChange} placeholder="Digite seu nome" />
      <p>{greet()}</p>

      {/* 6. Cronômetro */}
      <h3>Cronômetro</h3>
      <p>Tempo: {timer}s</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pausar" : "Iniciar"}
      </button>

      {/* 7. useMemo */}
      <h3>Quadrado do Número (useMemo)</h3>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
        placeholder="Digite um número"
      />
      <p>Quadrado: {squared}</p>
    </div>
  );
};

export default ReactHooksExercises;
