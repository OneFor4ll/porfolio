import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import { useTheme } from "./ThemeContext";
import Spacer from "./Spacer";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <AppBar position="static" color={darkMode ? "inherit" : "default"} sx={{ backgroundColor: darkMode ? "gray" : "inherit" }}>
      <Toolbar>
        {/* Logo Button */}
        <IconButton edge="start" color="inherit" onClick={handleLogoClick}>
          <Typography variant="h6" component="div" color={darkMode ? "white" : "inherit"}>
            Logo
          </Typography>
        </IconButton>

        {/* Spacer to push icons to the right */}
        <Spacer verticalSpacing={25} />


        {/* Dark/Light Mode Toggle */}
        <IconButton color="inherit" onClick={toggleDarkMode}>
          {darkMode ? <NightlightOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
