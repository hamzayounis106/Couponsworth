import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
// Find the root element
const rootElement = document.getElementById("root");

// Create a root
const root = createRoot(rootElement);
const queryClient = new QueryClient();
// Initial render
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
