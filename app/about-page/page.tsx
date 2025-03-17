"use client"

import React from "react"
import type { NextPage } from "next"
import About from "@/libs/components/sections/index/About"
import { Language } from "@/libs/components/theme/app/translations" // Import the Language type

interface HomeProps {
  language: Language
}

const Home: NextPage<HomeProps> = ({ language }) => {
  console.log("Home component language:", language) 
  return (
    <>
      <About />
    </>
  )
}

export default Home