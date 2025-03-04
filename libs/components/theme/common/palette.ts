import { grey } from '@mui/material/colors'
import { alpha, PaletteOptions } from '@mui/material/styles'

export default {
  dark: {
    mode: 'dark',
    primary: {
      main: '#FF006A',
      dark: '#ED0368',
      light: '#E7679A',
      background: alpha('#F60167', 0.08),
      border: alpha('#F60167', 0.5),
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9037FE',
      dark: '#6401D7',
      light: '#B482E6',
      background: alpha('#9037FE', 0.08),
      border: alpha('#9037FE', 0.5),
      contrastText: '#FFFFFF',
    },
    tertiary: {
      main: '#25007F',
      dark: '#000124',
      light: '#7F66A6',
      background: alpha('#25007F', 0.08),
      border: alpha('#25007F', 0.5),
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#F44336',
      dark: '#D32F2F',
      light: '#E57373',
      contrastText: 'rgba(0, 0, 0, 0.87)',
      background: '#2E0C0A',
    },
    info: {
      main: '#29B6F6',
      dark: '#0288D1',
      light: '#4FC3F7',
      contrastText: 'rgba(0, 0, 0, 0.87)',
      background: '#071F2E',
    },
    warning: {
      main: '#FFA726',
      dark: '#F57C00',
      light: '#FFB74D',
      contrastText: 'rgba(0, 0, 0, 0.87)',
      background: '#301E04',
    },
    success: {
      main: '#66BB6A',
      dark: '#388E3C',
      light: '#81C784',
      contrastText: 'rgba(0, 0, 0, 0.87)',
      background: '#0A130B',
    },
    action: {
      active: 'rgba(255, 255, 255, 0.56)',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.30)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(255, 255, 255, 0.12)',
    },
    background: {
      paper: '#191B1F',
      default: '#16181A',
      secondary: grey[900],
      blur: 'rgba(22, 24, 26, 0.54)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.70)',
      disabled: 'rgba(255, 255, 255, 0.50)',
    },
    other: {
      outlineBorder: 'rgba(0, 0, 0, 0.23)',
    },
  },
} as { [key: string]: PaletteOptions }
