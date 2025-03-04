import React from "react"
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'

const Navbar = () => {
  const handleLogoClick = () => {
    window.location.href = "/"
  }

  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleLogoClick}>
          <HomeRoundedIcon />
        </IconButton>

        <div style={{ flexGrow: 1 }} />

        <IconButton color="inherit" />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
