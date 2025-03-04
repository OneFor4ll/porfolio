"use client"

import React from "react"
import type { NextPage } from "next"
import Header from "../libs/components/pages/index/Header"
import Navbar from "./Navbar"

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Header />
    </>
  )
}

export default Home
