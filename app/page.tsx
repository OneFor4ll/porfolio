"use client";

import React from "react";
import type { NextPage } from "next";
import Header from "../libs/components/pages/index/Header";
import Navbar from "./Navbar";
import { ThemeProvider } from "./Theme";

const Home: NextPage = () => {
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <Header />
      </ThemeProvider>
    </>
  );
};

export default Home;
