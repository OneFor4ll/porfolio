import palette from '../common/palette'
import typography from '../common/typography'

const DarkTheme = {
  name: 'ONE_DARK',
  typography,
  palette: palette.dark,
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: 'Raleway',
      },
    },
  },
}

export default DarkTheme
