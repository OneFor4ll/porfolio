"use client"

import React, { useState } from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import EmailIcon from "@mui/icons-material/Email"
import { useRouter } from "next/navigation"
import { Language, translations } from "@/libs/components/theme/app/translations"
import { useLanguage } from "@/libs/components/sections/index/LanguageContext"

const Navbar = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => {
  const router = useRouter()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const { language, setLanguage } = useLanguage() // Use the useLanguage hook

  const email = "cebotariv20@gmail.com"

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setSnackbarOpen(true)
    } catch (error) {
      console.error("Failed to copy email:", error)
    }
  }

  const handleChangeLanguage = (event: SelectChangeEvent<Language>) => {
    setLanguage(event.target.value as Language) // Update language using the context
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
            <Select
              value={language}
              onChange={handleChangeLanguage}
              variant="standard"
              disableUnderline
              sx={{
                color: "inherit",
                "& .MuiSelect-icon": { color: "inherit" },
                marginRight: 2,
                "& .MuiSelect-select": {
                  backgroundColor: "transparent !important",
                },
              }}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="pt">PT</MenuItem>
              <MenuItem value="ru">RUS</MenuItem>
            </Select>

            <IconButton color="inherit" href="https://github.com/OneFor4ll" target="_blank">
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
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          {translations[language].emailCopied}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Navbar