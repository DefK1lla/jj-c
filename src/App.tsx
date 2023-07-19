import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { HomePage } from "./pages";

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route>
          {routes.map(({ path, Component }) => {
            return <Route key={path} path={path} element={Component} />;
          })
          }
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
