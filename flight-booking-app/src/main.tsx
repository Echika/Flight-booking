import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import theme from './theme.ts'
import { ThemeProvider, } from '@mui/material/styles'; 
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { CssBaseline } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
      </ThemeProvider>
    
    </QueryClientProvider>
  </StrictMode>,
)
