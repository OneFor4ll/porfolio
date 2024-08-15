import React from "react";
import type { NextPage } from 'next'
import { ThemeProvider } from "./ThemeContext";
import Navbar from "./Navbar";
import Header from "../libs/components/pages/index/Header";

const Home: NextPage = () => {
return (
  <>
  <ThemeProvider>
    <Navbar />
    <Header />
  </ThemeProvider>
  </>
)
}

export default Home