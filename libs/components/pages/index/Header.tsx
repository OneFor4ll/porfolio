"use client"

import React from "react"
import { Button, Box, Typography } from "@mui/material"

const Header = () => {

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={10}
      minHeight="90vh"
    >
      <Typography variant="h4">
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
  )
}

export default Header
