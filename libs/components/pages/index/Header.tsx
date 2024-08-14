"use client"

import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useTheme } from "@/app/ThemeContext";

const Header = () => {
  const { darkMode } = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      gap={10}
      sx={{ backgroundColor: darkMode ? "gray" : "inherit", color: darkMode ? "white" : "inherit", height: "100vh" }}
    >
      <Typography variant="h4" color={darkMode ? "white" : "inherit"}>
        Welcome to My Portfolio
      </Typography>
      <Box display="flex" gap={10}>
        <Button variant="contained" color="primary">
          Projects
        </Button>
        <Button variant="contained" color="primary">
          About Me
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
