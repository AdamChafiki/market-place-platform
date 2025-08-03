import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import BaseLayout from "@/layouts/BaseLayout";
import ScrollToTop from "@/components/common/ScrollToTop";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <BaseLayout>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </BaseLayout>
    </BrowserRouter>
  );
};

export default AppRouter;
