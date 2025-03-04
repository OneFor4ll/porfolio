"use client"

import React from "react"
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"
import Navbar from "./Navbar"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [darkMode] = React.useState(false)

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#90caf9" : "#1976d2",
          },
          background: {
            default: darkMode ? "#393939" : "#ffffff",
            paper: darkMode ? "#393939" : "#f5f5f5",
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
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout