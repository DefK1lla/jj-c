import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";
import { routes } from "./routes";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        {
          routes.map(({ path, Component }) => {
            return <Route key={path} path={path} element={Component} />;
          })
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
