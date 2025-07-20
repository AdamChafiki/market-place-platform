import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeView from "@/views/HomeView";
import ListView from "@/views/ListView";
import NotFoundView from "@/views/NotFoundView";
import BaseLayout from "@/layouts/BaseLayout";
import LoginView from "@/views/LoginView";

function App() {
  return (
    <BrowserRouter>
      <BaseLayout>
        <Routes>
          <Route index path="/" element={<HomeView />} />
          <Route path="/Browze" element={<ListView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </BaseLayout>
    </BrowserRouter>
  );
}

export default App;
