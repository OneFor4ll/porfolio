"use client";

import React, { useState } from "react";
import { Button, Box, Typography, Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useRouter } from "next/navigation";

const Main = () => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpenDrawer(isOpen);
  };

  const handleProjectClick = (path: string) => {
    router.push(path);
    setOpenDrawer(false);
  };

  const handleExternalLink = (url: string) => {
    window.open(url, "_blank")
    setOpenDrawer(false);
  };

  return (
    
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={10}
      minHeight="90vh"
    >
      <Typography variant="h4">Welcome to My Portfolio</Typography>

      <Box display="flex" gap={10}>
        <Button variant="contained" color="primary" onClick={toggleDrawer(true)}>
          Projects
        </Button>
        <Button variant="contained" color="primary" onClick={() => router.push("/about-page")}>
          About Me
        </Button>
      </Box>

      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            <Typography variant="subtitle1" sx={{ px: 2, py: 1, fontWeight: "bold" }}>
              Experiments
            </Typography>
            <ListItem button onClick={() => handleProjectClick("/alarm-page")}>
              <ListItemText primary="Alarm" />
            </ListItem>
            <ListItem button onClick={() => handleProjectClick("/projects/project2")}>
              <ListItemText primary="QR" />
            </ListItem>
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemText primary="Project 3" />
            </ListItem>

            <Divider sx={{ my: 1 }} />

            <Typography variant="subtitle1" sx={{ px: 2, py: 1, fontWeight: "bold" }}>
              GitHub Projects
            </Typography>
            <Typography variant="body2" sx={{ px: 2, py: 1, color: "gray", paddingTop: 0, fontStyle: "italic" }}>
              These projects were built using PHP with the CodeIgniter framework.
            </Typography>
            <ListItem button onClick={() => handleExternalLink("https://github.com/OneFor4ll/Work/tree/main/Shop")}>
              <ListItemText primary="Shop" />
            </ListItem>
            <ListItem button onClick={() => handleExternalLink("https://github.com/OneFor4ll/Work/tree/main/ControlManagement")}>
              <ListItemText primary="Control Management" />
            </ListItem>

          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Main;
