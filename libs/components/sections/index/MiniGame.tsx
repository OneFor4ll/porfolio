"use client"

import { Container, Button, Typography, Box } from "@mui/material"
import React, { useState } from "react"
import { useLanguage } from "./LanguageContext"
import { translations } from "../../theme/app/translations"

const GRID_SIZE = 16 // 4x4
const MINES_COUNT = 1
const GRID_COLUMNS = 4

type Cell = {
  isMine: boolean
  isRevealed: boolean
}

const generateBoard = (): Cell[] => {
  const board: Cell[] = Array.from({ length: GRID_SIZE }, () => ({
    isMine: false,
    isRevealed: false,
  }))

  let minesPlaced = 0
  while (minesPlaced < MINES_COUNT) {
    const index = Math.floor(Math.random() * GRID_SIZE)
    if (!board[index].isMine) {
      board[index].isMine = true
      minesPlaced++
    }
  }

  return board
}

const MiniGame = () => {
  const { language } = useLanguage()
  const t = translations[language as keyof typeof translations]
  const [board, setBoard] = useState<Cell[]>(generateBoard)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  const handleCellClick = (index: number) => {
    if (board[index].isRevealed || gameOver || gameWon) return

    const newBoard = [...board]
    newBoard[index].isRevealed = true

    if (newBoard[index].isMine) {
      setGameOver(true)
    } else {
      const revealedSafeCells = newBoard.filter(
        (cell) => cell.isRevealed && !cell.isMine
      ).length

      const totalSafeCells = GRID_SIZE - MINES_COUNT

      if (revealedSafeCells === totalSafeCells) {
        setGameWon(true)
      }
    }

    setBoard(newBoard)
  }

  const resetGame = () => {
    setBoard(generateBoard())
    setGameOver(false)
    setGameWon(false)
  }

  return (
    <Container
      sx={{
        minHeight: "110vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" gutterBottom paddingBottom={2}>
        {t.minesGame.title}
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={`repeat(${GRID_COLUMNS}, 60px)`}
        gap={1}
        sx={{ mb: 3 }}
      >
        {board.map((cell, index) => (
          <Button
            key={index}
            variant="contained"
            color={
              cell.isRevealed
                ? cell.isMine
                  ? "error"
                  : "success"
                : "primary"
            }
            onClick={() => handleCellClick(index)}
            sx={{ width: 60, height: 60 }}
            disabled={gameOver || gameWon}
          >
            {cell.isRevealed ? (cell.isMine ? "💣" : "✅") : ""}
          </Button>
        ))}
      </Box>

      <Box sx={{ minHeight: 80, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Typography
          variant="h6"
          color={gameOver ? "error" : gameWon ? "success.main" : "transparent"}
          sx={{
            mb: 2, visibility: gameOver || gameWon ? "visible" : "hidden", whiteSpace: "nowrap"
          }}
        >
          {gameOver ? t.minesGame.gameOver : gameWon ? t.minesGame.gameWon : ""}
        </Typography>

        <Box sx={{ visibility: gameOver || gameWon ? "visible" : "hidden", height: 30 }}>
          <Button variant="contained" onClick={resetGame}>
            {t.minesGame.restartButton}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default MiniGame