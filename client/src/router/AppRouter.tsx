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
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element}>
              {route.children?.map((child) => (
                <Route
                  key={child.path || "index"}
                  index={child.index}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          ))}
        </Routes>
      </BaseLayout>
    </BrowserRouter>
  );
};

export default AppRouter;
