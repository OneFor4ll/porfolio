"use client"

import React, { useState } from "react"
import { Button, Box, Typography, Drawer, List, ListItem, ListItemText, Divider, useMediaQuery, useTheme } from "@mui/material"
import { useRouter } from "next/navigation"
import { useLanguage } from "./LanguageContext"
import { translations } from "@/libs/components/theme/app/translations"

const Main = () => {
  const router = useRouter()
  const [openDrawer, setOpenDrawer] = useState(false)
  const theme = useTheme()
  const { language } = useLanguage()

  const isTablet = useMediaQuery(theme.breakpoints.only("sm"))
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"))

  const t = translations[language] || translations.en

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpenDrawer(isOpen)
  }

  const handleProjectClick = (path: string) => {
    router.push(path)
    setOpenDrawer(false)
  }

  const handleExternalLink = (url: string) => {
    window.open(url, "_blank")
    setOpenDrawer(false)
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={4}
      minHeight={isMobile ? "100vh" : "100vh"}
      padding={isMobile ? 2 : 4}
    >
      <Typography variant="h4" textAlign="center">
        {t.welcomeMessage}
      </Typography>

      <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2}>
        <Button variant="contained" color="primary" onClick={toggleDrawer(true)} fullWidth={isMobile}>
          {t.projectsButton}
        </Button>
        <Button variant="contained" color="primary" onClick={() => router.push("/about-page")} fullWidth={isMobile}>
          {t.aboutMeButton}
        </Button>
      </Box>

      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <Box sx={{ width: isMobile ? 200 : 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
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
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}

export default Main