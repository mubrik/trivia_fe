import {ReactNode} from 'react';
import {createTheme, responsiveFontSizes, ThemeProvider, CssBaseline} from '@mui/material';

// move to config file later
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    // add a `tab` breakpoint
    tab: true;
    md: true;
    lg: true;
    xl: true;
  }

  interface PaletteOptions {
    // mode: string;
    typography: {
      fontFamily: string;
      fontSize: number;
    };
  }
}

const DEFAULT_THEME = responsiveFontSizes(
  createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        tab: 768,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      primary: {
        light: '#bc90f9',
        main: '#8a62c6',
        dark: '#593695',
      },
      secondary: {
        light: '#ff8038',
        main: '#e2712e',
        dark: '#912000',
      },
      typography: {
        fontFamily: "'Ubuntu', 'Arial'",
        fontSize: 14,
      },
    },
    typography: {
      fontFamily: "'Ubuntu', 'Arial'",
      fontSize: 14,
    },
    colorSchemes: {
      dark: true,
      light: true,
    },
  }),
);

interface IProps {
  children: ReactNode;
}

export function MUIProvider({children}: IProps) {
  return (
    <ThemeProvider theme={DEFAULT_THEME}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
