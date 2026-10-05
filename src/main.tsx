import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { router } from './app/router';
import './index.css';

const theme = createTheme({
  palette: {
    primary: { main: '#2e7d32' },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);