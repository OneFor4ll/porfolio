"use client"

import React from "react"
import { Container, Typography, Box, Avatar, Grid, Paper } from "@mui/material"

const AboutPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "93.4vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 5,
      }}
    >
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" mb={8}>
          <Avatar
            src="/About me/me.jpg"
            alt="Profile Picture"
            sx={{
              width: 150,
              height: 150,
              border: "4px solid white",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "rgba(255, 255, 255, 0.76)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography variant="h4" gutterBottom>
                About Me
              </Typography>
              <Typography variant="body1" paragraph>
                Hi, I'm Vladimiro Cebotari, born in Portugal. I hold a Level 4 Computer Programming diploma from Escola Profissional Cristóvão Colombo.
              </Typography>
              <Typography variant="body1" paragraph>
                I am passionate about web development and software quality assurance. I enjoy learning new technologies and continuously improving my skills.
              </Typography>
              <Typography variant="body1">
                I am fluent in Russian, Portuguese, and English, which helps me collaborate with diverse teams and work in international environments.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "rgba(255, 255, 255, 0.76)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography variant="h4" gutterBottom>
                Experience
              </Typography>

              <Typography variant="body1" paragraph>
                <Typography component="span" fontWeight="bold">
                  Web Developer
                </Typography>{" "}
                – Yacooba (Feb 2024 - Feb 2025)
                Developed and maintained responsive web applications using React, TypeScript, and Material UI.
                Optimized performance, ensured UI consistency, and collaborated with cross-functional teams to deliver scalable solutions.
              </Typography>

              <Typography variant="body1" paragraph>
                <Typography component="span" fontWeight="bold">
                  QA Tester
                </Typography>{" "}
                – Connecting-Software (Jan 2023 - Mar 2023)
                Created and executed test cases to ensure software quality.
                Identified and resolved bugs, documented testing procedures, and contributed to product development and compliance testing.
              </Typography>

              <Typography variant="body1">
                <Typography component="span" fontWeight="bold">
                  Web Developer
                </Typography>{" "}
                – Be-wide (Jun 2022 - Jul 2022)
                Designed and developed responsive websites and plugins using JavaScript and PHP.
                Implemented interactive UI elements, tested functionality, and collaborated with teams to enhance web experiences.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "rgba(255, 255, 255, 0.76)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography variant="h4" gutterBottom>
                Skills
              </Typography>
              <Typography variant="body1" paragraph>
                <Typography component="span" fontWeight="bold">
                  Programming:
                </Typography>{" "}
                JavaScript, TypeScript, PHP, React, Material UI, SQL, Java, HTML, CSS, JSON.
              </Typography>
              <Typography variant="body1" paragraph>
                <Typography component="span" fontWeight="bold">
                  QA & Testing:
                </Typography>{" "}
                Writing and executing test cases, debugging, and using Storybook for UI testing.
              </Typography>
              <Typography variant="body1">
                <Typography component="span" fontWeight="bold">
                  Tools:
                </Typography>{" "}
                Git, Bootstrap, Microsoft Office, jQuery.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default AboutPage
