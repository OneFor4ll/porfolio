import Box from '@mui/material/Box'
import React from 'react'

export interface SpacerProps {
  horizontalSpacing?: number
  verticalSpacing?: number
}

const Spacer = ({
  horizontalSpacing = 0,
  verticalSpacing = 0,
}: SpacerProps) => {
  return (
    <Box sx={{ paddingTop: verticalSpacing, paddingLeft: horizontalSpacing }} />
  )
}

export default Spacer
