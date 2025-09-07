import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data fresh for 5 minutes
      gcTime: 30 * 60 * 1000, // Cache stays in memory for 30 minutes
      refetchOnWindowFocus: false, // Don't refetch when user switches back to tab
      refetchOnReconnect: false, // Don't refetch if internet reconnects
      retry: 1, // Retry failed requests twice
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
