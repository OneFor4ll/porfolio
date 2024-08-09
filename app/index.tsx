import React from "react";
import "./index.css";
import type { NextPage } from 'next'
import { ThemeProvider } from "./ThemeContext";
import Navbar from "./Navbar";
import Page from "./page";

const News: NextPage = () => {
return (
  <>
  <ThemeProvider>
    <Navbar />
    <Page />
  </ThemeProvider>
  </>
)
}

export default News