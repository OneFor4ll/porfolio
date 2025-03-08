"use client"

import React, { useState, useEffect, useMemo } from "react"
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material"
import Navbar from "./Navbar"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode")
    if (savedTheme !== null) {
      setDarkMode(savedTheme === "true")
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev
      localStorage.setItem("darkMode", newMode.toString())
      return newMode
    })
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#63e",
          },
          background: {
            default: darkMode ? "#000" : "#ffffff",
            paper: darkMode ? "#1e1e1e" : "#f5f5f5",
          },
          text: {
            primary: darkMode ? "#ffffff" : "#000000",
          },
        },
      }),
    [darkMode]
  )

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: -10,
              height: "100%",
              width: "100%",
              background: darkMode
                ? "radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)"
                : "radial-gradient(125% 125% at 50% 10%, #fff 40%, #63e 100%)",
              transition: "background 0.5s ease",
            }}
          />
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
