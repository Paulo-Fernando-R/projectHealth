import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  

  return (
   <QueryClientProvider client={queryClient}>
    <div className="titleh1">Hello</div>
   </QueryClientProvider>
  )
}

export default App
