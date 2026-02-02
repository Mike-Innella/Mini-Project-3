import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#22d3ee',
    },
    secondary: {
      main: '#f59e0b',
    },
    error: {
      main: '#f87171',
    },
    background: {
      default: '#0b0f1a',
      paper: '#111827',
    },
    text: {
      primary: '#e5e7eb',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: '"Nunito", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    h1: {
      fontFamily: '"Fjalla One", "Nunito", sans-serif',
      fontSize: '1.8rem',
      fontWeight: 700,
      letterSpacing: '0.02em',
    },
    subtitle1: {
      fontWeight: 600,
    },
    body2: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 14,
  },
});

function AppThemeProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default AppThemeProvider;
