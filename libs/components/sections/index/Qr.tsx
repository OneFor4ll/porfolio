"use client"

import React, { useState } from "react"
import { Box, Button, TextField, Typography, Slider, useMediaQuery, useTheme } from "@mui/material"
import { QRCodeCanvas } from "qrcode.react"

const QR: React.FC = () => {
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.only("sm"))
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"))

  const [qrValue, setQrValue] = useState("")
  const [color, setColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [size, setSize] = useState(200)

  const handleGenerateQR = () => {
    if (qrValue.trim() === "") return
    setQrValue(qrValue)
  }

  const downloadQR = () => {
    const canvas = document.getElementById("qrCode") as HTMLCanvasElement
    if (canvas) {
      const url = canvas.toDataURL("image/png")
      const a = document.createElement("a")
      a.href = url
      a.download = "qrcode.png"
      a.click()
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={isMobile ? 2 : 3}
      minHeight="90vh"
      justifyContent="center"
      px={isMobile ? 2 : isTablet ? 4 : 6}
      sx={{paddingBottom: isMobile ? 10 : isTablet ? 7 : 4, paddingTop: isMobile ? 10 : isTablet ? 7 : 4 }}
    >
      <Typography variant={isMobile ? "h5" : "h4"}>QR Code Generator</Typography>

      <TextField
        label="Enter URL"
        variant="outlined"
        fullWidth
        value={qrValue}
        onChange={(e) => setQrValue(e.target.value)}
        sx={{ maxWidth: isMobile ? 300 : 400 }}
      />

      <Box display="flex" gap={2} alignItems="center" flexDirection={isMobile ? "column" : "row"}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography>Color:</Typography>
          <TextField
            type="color"
            variant="outlined"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            sx={{ width: "80px" }}
          />
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Typography>Background:</Typography>
          <TextField
            type="color"
            variant="outlined"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            sx={{ width: "80px" }}
          />
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap={2} sx={{ width: isMobile ? "250px" : "300px" }}>
        <Typography>Size:</Typography>
        <Slider
          value={size}
          onChange={(e, newValue) => setSize(newValue as number)}
          step={50}
          marks
          min={100}
          max={300}
          sx={{ flex: 1 }}
        />
        <Typography>{size}px</Typography>
      </Box>

      {qrValue && (
        <>
          <Box mt={2} p={2} border="1px solid #ccc" borderRadius={2} display="flex" justifyContent="center">
            <QRCodeCanvas id="qrCode" value={qrValue} size={size} fgColor={color} bgColor={bgColor} />
          </Box>

          <Button variant="contained" color="secondary" onClick={downloadQR}>
            Download QR Code
          </Button>
        </>
      )}
    </Box>
  )
}

export default QR
