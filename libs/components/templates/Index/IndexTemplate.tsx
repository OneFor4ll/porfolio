import React from "react";
import "./index.css";
import type { NextPage } from 'next'
import { ThemeProvider } from "../../../../app/ThemeContext";
import Navbar from "../../../../app/Navbar";
import Page from "@/app/Header";

const Home: NextPage = () => {
return (
  <>
    <Page />
  </>
)
}

export default Home