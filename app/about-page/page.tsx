"use client"

import React from "react"
import type { NextPage } from "next"
import About from "@/libs/components/sections/index/About"
import { Language } from "@/libs/components/theme/app/translations"

interface HomeProps {
  language: Language
}

const AboutPage : NextPage<HomeProps> = ({ language }) => {
  return (
    <>
      <About />
    </>
  )
}

export default AboutPage 