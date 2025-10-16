// theme configuration
import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    // ⭐️ Primary: Deep Emerald Green
    primary: {
      main: '#ffa500', 
      light: '#39796B',
      dark: '#ffa400',
      contrastText: '#FFFFFF',
    },
    // ⭐️ Secondary: Warm Sunset Orange/Amber
    secondary: {
      main: '#FFB300', // Amber
      light: '#FFE54C',
      dark: '#C68200',
      contrastText: '#000000',
    },
    background: {
      default: '#FAFAFA', // Off-white for clean look
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
    h6: {
      fontWeight: 600, // Makes titles stand out more
    },
  },
  components: {
    // Customizing the Card elevation for a slightly more premium feel
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    // Customizing the main button color on hover/focus
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Use standard capitalization
        },
        containedPrimary: {
          // Slightly darker on hover for a good effect
          '&:hover': {
            backgroundColor: '#ffa400', 
          },
        },
      },
    },
  },
});

export default theme