import { responsiveFontSizes } from '@mui/material/styles'
import {
  TypeBackground,
  Palette,
  PaletteColor,
} from '@mui/material/styles/createPalette'
import createMuiTheme, {
  Theme as MuiTheme,
} from '@mui/material/styles/createTheme'
import { Typography, Variant } from '@mui/material/styles/createTypography'
import dark from './dark'

export interface Theme extends MuiTheme {
  name: string
  palette: Palette & {
    primary: PaletteColor & {
      background: string
      border: string
    }
    secondary: PaletteColor & {
      background: string
      border: string
    }
    tertiary: PaletteColor & {
      background: string
      border: string
    }
  }
  typography: Typography & {
    display1: Variant & {
      fontSize: string
      fontWeight: number
      lineHeight: string
      letterSpacing: string
    }
    display2: Variant & {
      fontSize: string
      fontWeight: number
      lineHeight: string
      letterSpacing: string
    }
    display3: Variant & {
      fontSize: string
      fontWeight: number
      lineHeight: string
      letterSpacing: string
    }
    h7: Variant & {
      fontSize: string
      fontWeight: number
      lineHeight: string
      letterSpacing: string
    }
    body3: Variant & {
      fontSize: string
      fontWeight: number
      lineHeight: string
      letterSpacing: string
    }
    body4: Variant & {
      fontSize: string
      fontWeight: number
      lineHeight: string
      letterSpacing: string
    }
  }
  background: TypeBackground & {
    secondary: string
    blur: string
  }
}

export const createTheme = () => {
  const theme = dark as unknown as Theme
  return responsiveFontSizes(createMuiTheme(theme))
}
