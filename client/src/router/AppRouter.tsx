import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import BaseLayout from "@/layouts/BaseLayout";

const AppRouter = () => {
  return (
    <BrowserRouter>
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
