import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { Toaster } from 'sonner'
import ControlLayout from './layouts/control-layout';
function App() {
  const client=new QueryClient();

  return (
<QueryClientProvider client={client}>
  <ControlLayout >

  </ControlLayout>
  <Toaster/>
    </QueryClientProvider>
  )
}

export default App
