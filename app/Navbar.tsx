'use client'

import React from "react";
import { AppBar, Toolbar, IconButton, Typography, useTheme } from "@mui/material";
import Spacer from "../libs/components/atomic/spacer/Spacer";

const Navbar = () => {

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <AppBar position="static" color={"default"} sx={{ backgroundColor:"inherit" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleLogoClick}>
          <Typography variant="h6" component="div" color={"inherit"}>
            Logo
          </Typography>
        </IconButton>
        <Spacer verticalSpacing={25} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
