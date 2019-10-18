import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  // transitions: {
  //   // So we have `transition: none;` everywhere
  //   create: () => 'none',
  // },
  overrides: {
    // Name of the component ⚛️
    CssBasline: {
      // Name of the rule
      '@global': {
        '*, *::before, *::after': {
          transition: 'none !important',
          animation: 'none !important',
        },
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
})

export default theme
