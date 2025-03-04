"use client"

import React from "react"
import { Button, Box, Typography } from "@mui/material"
import { useRouter } from "next/navigation" 


const Header = () => {
  const router = useRouter() 

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
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/about-page")} 
        >
          About Me
        </Button>
      </Box>
    </Box>
  )
}

export default Header
