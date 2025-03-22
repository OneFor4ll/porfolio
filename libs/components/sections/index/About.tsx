"use client"

import React from "react"
import { Container, Typography, Box, Avatar, Grid, Paper, useMediaQuery, useTheme } from "@mui/material"
import { translations } from "@/libs/components/theme/app/translations"
import { useLanguage } from "./LanguageContext"
import { FaReact, FaNodeJs, FaJs, FaPhp, FaGitAlt, FaJava, FaDatabase, FaClipboardCheck, FaCloud } from "react-icons/fa"
import {
  SiTypescript,
  SiMaterialdesign,
  SiCodeigniter,
  SiBootstrap,
  SiJquery,
  SiStorybook,
} from "react-icons/si"

const About = () => {
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.only("sm"))
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"))
  const { language } = useLanguage()

  const t = translations[language] || translations.en

  const skillIcons: { [key: string]: JSX.Element } = {
    JavaScript: <FaJs />,
    TypeScript: <SiTypescript />,
    PHP: <FaPhp />,
    React: <FaReact />,
    "Material UI": <SiMaterialdesign />,
    SQL: <FaDatabase />,
    Java: <FaJava />,
    CodeIgniter: <SiCodeigniter />,
    JSON: <FaJs />,
    Git: <FaGitAlt />,
    Bootstrap: <SiBootstrap />,
    jQuery: <SiJquery />,
    Storybook: <SiStorybook />,
    "Test Cases": <FaClipboardCheck />,
    "Dynamics 365": <FaCloud />,
  }

  const aboutMeContent = [t.aboutMeText1, t.aboutMeText2, t.aboutMeText3]

  const experienceContent = [
    {
      title: t.experience1Title,
      company: t.experience1Company,
      description: t.experience1Description,
    },
    {
      title: t.experience2Title,
      company: t.experience2Company,
      description: t.experience2Description,
    },
    {
      title: t.experience3Title,
      company: t.experience3Company,
      description: t.experience3Description,
    },
  ]

  return (
    <Box
      sx={{
        minHeight: "93.4vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: isMobile ? 3 : 5,
      }}
    >
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" mb={isMobile ? 4 : 8}>
          <Avatar
            src="/About me/me.jpg"
            alt="Profile Picture"
            sx={{
              width: isMobile ? 100 : isTablet ? 130 : 150,
              height: isMobile ? 100 : isTablet ? 130 : 150,
              border: "4px solid white",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Box>

        <Grid container spacing={isMobile ? 2 : 4}>
          {/* About Me Section */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                height: "100%",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: theme.palette.background.paper,
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Typography variant="h4" sx={{paddingBottom:3}}>
                {t.aboutMe}
              </Typography>
              {aboutMeContent.map((text, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  paragraph
                  sx={{
                    paddingBottom: 5,
                    lineHeight: 2.1,
                  }}
                >
                  {text}
                </Typography>
              ))}
            </Paper>
          </Grid>

          {/* Experience Section */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: theme.palette.background.paper,
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Typography variant="h4" gutterBottom>
                {t.experience}
              </Typography>
              {experienceContent.map((exp, index) => (
                <Typography key={index} variant="body1" paragraph>
                  <Typography component="span" fontWeight="bold">
                    {exp.title}
                  </Typography>{" "}
                  – {exp.company} {exp.description}
                </Typography>
              ))}
            </Paper>
          </Grid>

          {/* Technologies I Work With Section */}
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: theme.palette.background.paper,
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Typography variant="h4" gutterBottom>
                {t.technologiesTitle}
              </Typography>
              <Grid
                container
                spacing={1}
                justifyContent="center"
                sx={{ mt: 3 }}
              >
                {Object.entries(skillIcons).map(([tech, icon], index) => (
                  <Grid
                    key={tech}
                    item
                    xs={6}
                    sm={4}
                    md={3}
                    display="flex"
                    justifyContent="center"
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        width: "140px",
                        height: "140px",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                          boxShadow: theme.palette.mode === "dark" ? "0px 8px 24px rgba(255, 255, 255, 0.1)" : "0px 8px 24px rgba(0, 0, 0, 0.2)",
                          backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.default : theme.palette.background.paper,
                        },
                      }}
                    >
                      <Box sx={{ fontSize: "2.5rem", color: theme.palette.primary.main }}>
                        {icon}
                      </Box>
                      <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.primary }}>
                        {tech}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default About