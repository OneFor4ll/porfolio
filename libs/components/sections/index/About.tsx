"use client"

import React from "react"
import { Container, Typography, Box, Avatar, Grid, Paper, useMediaQuery, useTheme } from "@mui/material"
import { translations } from "@/libs/components/theme/app/translations"
import { useLanguage } from "./LanguageContext"

const About = () => {
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.only("sm"))
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"))
  const { language } = useLanguage()

  console.log("About component language:", language)

  const t = translations[language] || translations.en

  const aboutMeContent = [
    t.aboutMeText1,
    t.aboutMeText2,
    t.aboutMeText3,
  ]

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

  const skillsContent = [
    {
      category: t.skillsProgramming,
      list: t.skillsProgrammingList,
    },
    {
      category: t.skillsQA,
      list: t.skillsQAList,
    },
    {
      category: t.skillsTools,
      list: t.skillsToolsList,
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
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>
                {t.aboutMe}
              </Typography>
              {aboutMeContent.map((text, index) => (
                <Typography key={index} variant="body1" paragraph>
                  {text}
                </Typography>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                p: isMobile ? 2 : 3,
                borderRadius: 3,
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
                {t.experience}
              </Typography>
              {experienceContent.map((exp, index) => (
                <Typography key={index} variant="body1" paragraph>
                  <Typography component="span" fontWeight="bold">
                    {exp.title}
                  </Typography>{" "}
                  – {exp.company} {" "}
                  {exp.description}
                </Typography>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={6}
              sx={{
                p: isMobile ? 2 : 3,
                borderRadius: 3,
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
                {t.skills}
              </Typography>
              {skillsContent.map((skill, index) => (
                <Typography key={index} variant="body1" paragraph>
                  <Typography component="span" fontWeight="bold">
                    {skill.category}
                  </Typography>{" "}
                  {skill.list}
                </Typography>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default About