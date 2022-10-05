import { useMemo, useState, ReactNode } from 'react';
// material
import { 
  createTheme, responsiveFontSizes ,
  ThemeProvider, useMediaQuery, CssBaseline
} from '@mui/material';
import createTypeContext from '../utils/createContext';

// move to config file later
declare module '@mui/material/styles' {

  interface BreakpointOverrides {
    xs: true; 
    sm: true;
    tab: true; // add a `tab` breakpoint
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

interface IProps {
  children: ReactNode;
}

interface IDarkModeState {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const [useDarkMode, DarkModeProvider] = createTypeContext<IDarkModeState>("DarkModeContext");

const ContextProvider = ({ children }: IProps) => {
  // sytem preference dark mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  // responsive theme
  const theme = useMemo(() => {
    return responsiveFontSizes(
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
          mode: darkMode ? 'dark' : 'light',
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
      })
    )
  }, [darkMode]);

  const dkMode = useMemo(() => {
    return {
      darkMode,
      setDarkMode
    }
  }, [darkMode]);

  return(
    <>
      <ThemeProvider theme={theme}>
      <DarkModeProvider value={dkMode}>
      <CssBaseline />
        {children}
      </DarkModeProvider>
      </ThemeProvider>
    </>
  );
};

export default ContextProvider;
export {useDarkMode}