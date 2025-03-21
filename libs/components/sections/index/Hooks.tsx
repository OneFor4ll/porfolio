"use client"

import React, { useState, useEffect, useReducer, useMemo, useCallback, useContext } from "react"
import { Button, Typography, Container, Paper, TextField, useTheme, useMediaQuery } from "@mui/material"
import { useLanguage } from "@/libs/components/sections/index/LanguageContext"
import { translations } from "@/libs/components/theme/app/translations"

//useContext
const UserContext = React.createContext<{ username: string }>({ username: "Guest" })

//useReducer
type State = { count: number }
type Action = { type: "increment" } | { type: "decrement" }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 }
    case "decrement":
      return { count: state.count - 1 }
    default:
      throw new Error("Ação desconhecida")
  }
}

const Hooks = () => {
  const { language } = useLanguage()

  // useState
  const [name, setName] = useState<string>("")

  // useEffect
  useEffect(() => {
    console.log("Componente montado ou nome atualizado:", name)
    return () => {
      console.log("Componente desmontado ou nome mudará:", name)
    }
  }, [name])

  // useReducer
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  // useMemo
  const memoizedCalculation = useMemo(() => {
    console.log("Calculando valor memorizado...")
    return state.count * 2
  }, [state.count])

  // useCallback
  const handleAlert = useCallback(() => {
    alert(
      `${translations[language].hooks.welcomeMessage}, ${name || translations[language].hooks.guest}! ${
        translations[language].hooks.counterMessage
      }: ${state.count}`
    )
  }, [name, state.count, language])

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          {translations[language].hooks.title}
        </Typography>

        {/* useState */}
        <Typography variant="h6">{translations[language].hooks.useStateTitle}</Typography>
        <TextField
          label={translations[language].hooks.nameLabel}
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Typography>
          {translations[language].hooks.name}: {name}
        </Typography>

        {/* useEffect */}
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          {translations[language].hooks.useEffectTitle}
        </Typography>
        <Typography>{translations[language].hooks.useEffectDescription}</Typography>

        {/* useReducer */}
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          {translations[language].hooks.useReducerTitle}
        </Typography>
        <Typography>
          {translations[language].hooks.counter}: {state.count}
        </Typography>
        <Button variant="contained" onClick={() => dispatch({ type: "increment" })}>
          {translations[language].hooks.increment}
        </Button>
        <Button variant="outlined" onClick={() => dispatch({ type: "decrement" })} style={{ marginLeft: "10px" }}>
          {translations[language].hooks.decrement}
        </Button>

        {/* useMemo */}
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          {translations[language].hooks.useMemoTitle}
        </Typography>
        <Typography>
          {translations[language].hooks.memoizedValue}: {memoizedCalculation}
        </Typography>

        {/* useCallback */}
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          {translations[language].hooks.useCallbackTitle}
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleAlert}>
          {translations[language].hooks.showAlert}
        </Button>
      </Paper>
    </Container>
  )
}

export default Hooks