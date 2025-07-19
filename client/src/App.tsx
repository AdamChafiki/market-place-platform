import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeView from "@/views/HomeView";
import ListView from "@/views/ListView";
import NotFoundView from "./views/NotFoundView";
import BaseLayout from "./layouts/BaseLayout";

function App() {
  return (
    <BrowserRouter>
      <BaseLayout>
        <Routes>
          <Route index path="/" element={<HomeView />} />
          <Route path="/list" element={<ListView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </BaseLayout>
    </BrowserRouter>
  );
}

export default App;
