import { theme } from './theme.ts';
import { ThemeProvider } from '@mui/material'
import { AuthProvider } from 'contexts/AuthContext.tsx';
import { Navigation } from './navigation/Navigation.tsx'
import { Snackbar } from 'components/Shared/Snackbar.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Snackbar />
          <Navigation />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
