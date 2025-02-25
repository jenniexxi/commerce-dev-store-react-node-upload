import { CookiesProvider } from 'react-cookie';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { ModalContainer } from '@components/modal/ModalContainer';
import { ToastContainer } from '@components/toast/Toast';

import RootRouter from '@router/RootRouter.tsx';

import GlobalStyles from '@styles/globalStyles.ts';
import theme from '@styles/theme.ts';

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme.lightTheme}>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <RootRouter />
          <ToastContainer />
          <ModalContainer />
        </QueryClientProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default App;
