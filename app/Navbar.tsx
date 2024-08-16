import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import { useTheme } from "./Theme";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <AppBar
      position="static"
      color={darkMode ? "inherit" : "default"}
      sx={{ backgroundColor: darkMode ? "gray" : "inherit" }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleLogoClick}>
          <Typography
            variant="h6"
            component="div"
            color={darkMode ? "white" : "inherit"}
          >
            Logo
          </Typography>
        </IconButton>

        <div style={{ flexGrow: 1 }} />

        <IconButton color="inherit" onClick={toggleDarkMode}>
          {darkMode ? <NightlightOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
