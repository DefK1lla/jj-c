import {
  AuthPage,
  HomePage,
  GamePage,
  FolderPage,
  FilePage,
  TranslatePage
} from "./pages";
import { path } from "./utils/constants";

export const routes = [
  {
    path: path.AUTH_ROUTE,
    Component: <AuthPage />
  },
  {
    path: path.REGISTRATION_ROUTE,
    Component: <AuthPage />
  },
  {
    path: path.HOME_ROUTE,
    Component: <HomePage />
  },
  {
    path: path.GAME_ROUTE,
    Component: <GamePage />
  },

  {
    path: path.FOLDER_ROUTE,
    Component: <FolderPage />

  },
  {
    path: path.FILE_ROUTE,
    Component: <FilePage />
  },
  {
    path: path.TRANSLATE_ROUTE,
    Component: <TranslatePage />
  },
  {
    path: path.NOT_FOUND,
    Component: <HomePage />
  },
];