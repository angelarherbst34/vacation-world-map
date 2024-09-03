import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  headerHeight: {
    desktop: '64px',
    mobile: '56px',
  },
  breakpoints: {
    values: {
      mobile: 500,
      desktop: 1280,
    },
  },
})

declare module '@mui/material/styles' {
  interface Theme {
    headerHeight: {
      desktop: string
      mobile: string
    }
  }
  interface ThemeOptions {
    headerHeight?: {
      desktop?: string
      mobile?: string
    }
  }
  interface BreakpointOverrides {
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
    mobile: true
    tablet: false
    laptop: false
    desktop: true
  }
}

export default theme
