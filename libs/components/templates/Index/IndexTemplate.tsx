import React from "react";
import "./index.css";
import type { NextPage } from 'next'
import { ThemeProvider } from "../../../../app/ThemeContext";
import Navbar from "../../../../app/Navbar";
import Header from "../../pages/index/Header";

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