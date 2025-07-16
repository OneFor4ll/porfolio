"use client";

import { Container, Button, Typography, Box } from "@mui/material";
import React, { useState } from "react";

const GRID_SIZE = 16; // 4x4
const MINES_COUNT = 1;
const GRID_COLUMNS = 4;

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
};

const generateBoard = (): Cell[] => {
  const board: Cell[] = Array.from({ length: GRID_SIZE }, () => ({
    isMine: false,
    isRevealed: false,
  }));

  let minesPlaced = 0;
  while (minesPlaced < MINES_COUNT) {
    const index = Math.floor(Math.random() * GRID_SIZE);
    if (!board[index].isMine) {
      board[index].isMine = true;
      minesPlaced++;
    }
  }

  return board;
};

const MiniGame = () => {
  const [board, setBoard] = useState<Cell[]>(generateBoard);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const handleCellClick = (index: number) => {
    if (board[index].isRevealed || gameOver || gameWon) return;

    const newBoard = [...board];
    newBoard[index].isRevealed = true;

    if (newBoard[index].isMine) {
      setGameOver(true);
    } else {
      const revealedSafeCells = newBoard.filter(
        (cell) => cell.isRevealed && !cell.isMine
      ).length;

      const totalSafeCells = GRID_SIZE - MINES_COUNT;

      if (revealedSafeCells === totalSafeCells) {
        setGameWon(true);
      }
    }

    setBoard(newBoard);
  };

  const resetGame = () => {
    setBoard(generateBoard());
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" gutterBottom paddingBottom={2}>
        Mines Game
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

      {gameOver && (
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
          💀 Game Over! You hit a mine.
        </Typography>
      )}

      {gameWon && (
        <Typography variant="h6" color="success.main" sx={{ mb: 2 }}>
          🎉 You Won! All safe cells cleared!
        </Typography>
      )}

      {(gameOver || gameWon) && (
        <Button variant="contained" onClick={resetGame}>
          Restart Game
        </Button>
      )}
    </Container>
  );
};

export default MiniGame;
