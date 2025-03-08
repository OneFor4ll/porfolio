"use client"

import React from "react"
import { AppBar, Toolbar, IconButton, Box, Snackbar, Alert } from "@mui/material"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import EmailIcon from "@mui/icons-material/Email"
import { useRouter } from "next/navigation"

interface NavbarProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const router = useRouter()
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  const email = "cebotariv20@gmail.com"

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setSnackbarOpen(true)
    } catch (error) {
      console.error("Failed to copy email:", error)
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton edge="start" color="inherit" onClick={() => router.push("/")}>
              <HomeRoundedIcon />
            </IconButton>

            <IconButton edge="end" color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <LightModeOutlinedIcon /> : <NightlightOutlinedIcon />}
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              href="https://github.com/OneFor4ll"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>

            <IconButton
              color="inherit"
              href="https://www.linkedin.com/in/vladimiro-cebotari-1a0451252/"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>

            <IconButton color="inherit" onClick={handleCopyEmail}>
              <EmailIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Email copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  )
}

export default Navbar
