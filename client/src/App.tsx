import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import HomeView from "@/views/HomeView";
import ListView from "@/views/ListView";
import NotFoundView from "@/views/NotFoundView";
import BaseLayout from "@/layouts/BaseLayout";
import LoginView from "@/views/LoginView";
import RegisterView from "./views/RegisterView";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <BaseLayout>
          <Routes>
            <Route index path="/" element={<HomeView />} />
            <Route path="/Browze" element={<ListView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
