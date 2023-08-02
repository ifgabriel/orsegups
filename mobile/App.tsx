import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Main } from './src/pages';

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SafeAreaView>
      <StatusBar />
      <Main />
    </SafeAreaView>
  </QueryClientProvider>
)

export default App;
