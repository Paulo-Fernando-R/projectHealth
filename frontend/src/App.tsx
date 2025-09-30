import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import AppRoutes from "./AppRoutes";

function App() {
  

  return (
   <QueryClientProvider client={queryClient}>
    <AppRoutes />
   </QueryClientProvider>
  )
}

export default App
