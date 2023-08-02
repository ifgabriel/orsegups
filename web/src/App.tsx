import { Main } from '@/pages'
import { queryClient } from '@/services/utils'
import { QueryClientProvider } from 'react-query'

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
)

export default App
