import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import HomeView from "@/views/home/HomeView";
import ListView from "@/views/announcement/AnnoucementListView";
import NotFoundView from "@/views/not-found/NotFoundView";
import BaseLayout from "@/layouts/BaseLayout";
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";
import GuestOnlyRoute from "@/components/GuestOnlyRoute";
import AnnouncementDetails from "./views/announcement/AnnouncementDetails";
import AnnoucementCreate from "@/views/announcement/AnnoucementCreate";

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
            <Route path="/annoucement/create" element={<AnnoucementCreate />} />
            <Route
              path="/annoucement/create"
              element={<AnnouncementDetails />}
            />
            <Route path="/announcement/:id" element={<AnnouncementDetails />} />
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
