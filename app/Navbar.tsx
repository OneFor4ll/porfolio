"use client"

import React, { useEffect } from "react"
import { AppBar, Toolbar, IconButton, ThemeProvider, createTheme, CssBaseline } from "@mui/material"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [darkMode, setDarkMode] = React.useState(false)
  const router = useRouter()

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
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                transition: 'background-color 0.3s ease, color 0.3s ease',
              },
            },
          },
          MuiToolbar: {
            styleOverrides: {
              root: {
                transition: 'background-color 0.3s ease, color 0.3s ease',
              },
            },
          },
        },
      }),
    [darkMode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => router.push("/")}>
            <HomeRoundedIcon />
          </IconButton>

          <IconButton edge="end" color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <LightModeOutlinedIcon /> : <NightlightOutlinedIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Navbar
