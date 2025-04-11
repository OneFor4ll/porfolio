"use client"

import React from "react"
import type { NextPage } from "next"
import ArrayExercises from "@/libs/components/sections/index/ArrayExercises"
import StringExercises from "@/libs/components/sections/index/StringExercises"
import CombinedExercise from "@/libs/components/sections/index/CombinedExercise"
import ReactHooksExercises from "@/libs/components/sections/index/ReactHooksExercises"

const Home: NextPage = () => {
    return (
        <>
      <ArrayExercises />
      <StringExercises />
      <CombinedExercise />
      <ReactHooksExercises />

        </>
    )
}

export default Home