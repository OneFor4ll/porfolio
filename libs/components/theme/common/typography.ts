import { TypographyOptions } from '@mui/material/styles/createTypography'

// Check default theme object here:
// https://mui.com/customization/default-theme/

export default {
  fontFamily: 'Raleway',
  display1: {
    fontSize: '9rem', // 144px
    fontWeight: 400,
    lineHeight: '1.11', // 160px
    letterSpacing: '0.0075rem',
  },
  display2: {
    fontSize: '6rem', // 96px
    fontWeight: 400,
    lineHeight: '1.17', // 112px
    letterSpacing: '0.0075rem',
  },
  display3: {
    fontSize: '4.5rem', // 72px
    fontWeight: 400,
    lineHeight: '1.25', // 90px
    letterSpacing: '0.0075rem',
  },
  h1: {
    fontSize: '3.75rem', // 60px
  },
  h2: {
    fontSize: '3.5rem', // 56px
    lineHeight: '1.18', // 66px
  },
  h3: {
    fontSize: '3rem', // 48px, same as default theme
  },
  h4: {
    fontSize: '2.125rem', // 34px, same as default theme
    letterSpacing: '0.016rem', // 0.25px
  },
  h5: {
    fontSize: '1.5rem', // 24px, same as default theme
  },
  h6: {
    fontSize: '1.25rem', // 20px, same as default theme
    fontWeight: 400,
  },
  h7: {
    fontSize: '1.125rem', // 18px
    fontWeight: 400,
  },
  subtitle1: {
    fontSize: '1rem', // 16px, same as default theme
  },
  subtitle2: {
    fontSize: '0.875rem', // 14px, same as default theme
    fontWeight: 400,
  },
  body1: {
    fontSize: '1rem', // 16px, same as default theme
  },
  body2: {
    fontSize: '0.875rem', // 14px, same as default theme
    letterSpacing: '0.009rem', // 0.15px
  },
  body3: {
    fontSize: '0.75rem', // 12px
    fontWeight: 400,
    lineHeight: '1.167', // 14px
    letterSpacing: '0.025rem',
  },
  body4: {
    fontSize: '0.625rem', // 10px
    fontWeight: 400,
    lineHeight: '1.2', // 12px
    letterSpacing: '0.025rem',
  },
  caption: {
    fontSize: '0.75rem', // 12px, same as default theme
    letterSpacing: '0.025rem', // 0.4px
  },
  overline: {
    fontSize: '0.75rem', // 12px, same as default theme
    letterSpacing: '0.063rem', // 1px
    textTransform: 'uppercase',
  },
} as TypographyOptions
