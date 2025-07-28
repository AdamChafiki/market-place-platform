import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import HomeView from "@/views/home/HomeView";
import ListView from "@/views/article/ArticleListView";
import NotFoundView from "@/views/not-found/NotFoundView";
import BaseLayout from "@/layouts/BaseLayout";
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";
import GuestOnlyRoute from "@/components/GuestOnlyRoute";
import ArticleCreate from "@/views/article/ArticleCreate";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <BaseLayout>
          <Routes>
            <Route index path="/" element={<HomeView />} />
            <Route path="/Browze" element={<ListView />} />
            <Route
              path="/register"
              element={
                <GuestOnlyRoute>
                  <RegisterView />
                </GuestOnlyRoute>
              }
            />
            <Route
              path="/login"
              element={
                <GuestOnlyRoute>
                  <LoginView />
                </GuestOnlyRoute>
              }
            />
            <Route path="/article/create" element={<ArticleCreate />} />
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
