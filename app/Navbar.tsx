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
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import EmailIcon from "@mui/icons-material/Email"
import MenuIcon from "@mui/icons-material/Menu"
import { useRouter, usePathname } from "next/navigation"
import { Language, translations } from "@/libs/components/theme/app/translations"
import { useLanguage } from "@/libs/components/sections/index/LanguageContext"


const Navbar = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => {
  const router = useRouter()
  const theme = useTheme()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const { language, setLanguage } = useLanguage()
  const isTablet = useMediaQuery(theme.breakpoints.only("sm"))
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"))
  const email = "cebotariv20@gmail.com"
  const t = translations[language]

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setSnackbarOpen(true)
    } catch (error) {
      console.error("Failed to copy email:", error)
    }
  }

  const handleChangeLanguage = (event: SelectChangeEvent<Language>) => {
    setLanguage(event.target.value as Language)
  }

  const handleProjectClick = (path: string) => {
    router.push(path)
    setOpenDrawer(false)
  }

  const handleExternalLink = (url: string) => {
    window.open(url, "_blank")
    setOpenDrawer(false)
  }

  const iconColor = darkMode ? "#ffffff" : "#000000"

  const pathname = usePathname()

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "transparent",
          color: iconColor,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {pathname === "/" ? (
              <>
                <IconButton edge="start" color="inherit" onClick={() => router.push("/")}>
                  <HomeRoundedIcon />
                </IconButton>

                <IconButton edge="end" color="inherit" onClick={toggleDarkMode}>
                  {darkMode ? <LightModeOutlinedIcon /> : <NightlightOutlinedIcon />}
                </IconButton>
              </>
            ) : (
              <IconButton edge="start" color="inherit" onClick={() => setOpenDrawer(true)}>
                <MenuIcon />
              </IconButton>
            )}
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
              <MenuItem value="ru">RU</MenuItem>
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

      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: isMobile ? 200 : 250 }}>
          {pathname !== "/" && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  paddingTop:2
                }}
              >
                <IconButton
                  color="inherit"
                  onClick={() => { router.push("/"); setOpenDrawer(false); }}
                >
                  <HomeRoundedIcon />
                </IconButton>

                <IconButton
                  color="inherit"
                  onClick={() => { toggleDarkMode(); setOpenDrawer(false); }}
                >
                  {darkMode ? <LightModeOutlinedIcon /> : <NightlightOutlinedIcon />}
                </IconButton>
              </Box>
            </>
          )}


          <Typography variant="subtitle1" sx={{ px: 2, py: 1, fontWeight: "bold" }}>
            {t.experimentsTitle}
          </Typography>

          <ListItem button onClick={() => handleProjectClick("/alarm-page")}>
            <ListItemText primary={t.alarmProject} />
          </ListItem>

          <ListItem button onClick={() => handleProjectClick("/qr-page")}>
            <ListItemText primary={t.qrProject} />
          </ListItem>

          <Divider sx={{ my: 1 }} />

          <Typography variant="subtitle1" sx={{ px: 2, py: 1, fontWeight: "bold" }}>
            {t.githubProjectsTitle}
          </Typography>

          <Typography variant="body2" sx={{ px: 2, py: 1, color: "gray", fontStyle: "italic" }}>
            {t.githubProjectsDescription}
          </Typography>

          <ListItem button onClick={() => handleExternalLink("https://github.com/OneFor4ll/Work/tree/main/Shop")}>
            <ListItemText primary={t.shopProject} />
          </ListItem>

          <ListItem button onClick={() => handleExternalLink("https://github.com/OneFor4ll/Work/tree/main/ControlManagement")}>
            <ListItemText primary={t.controlManagementProject} />
          </ListItem>
        </Box>
      </Drawer>


      <Snackbar open={snackbarOpen} autoHideDuration={1000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          {t.emailCopied}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Navbar
