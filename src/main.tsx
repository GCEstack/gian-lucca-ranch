import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import PasswordGate from "./components/PasswordGate";
import Home from "./pages/Home";
import Videos from "./pages/Videos";
import Learning from "./pages/Learning";
import Stories from "./pages/Stories";
import Music from "./pages/Music";
import Companion from "./pages/Companion";
import Family from "./pages/Family";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "videos", element: <Videos /> },
      { path: "learning", element: <Learning /> },
      { path: "stories", element: <Stories /> },
      { path: "music", element: <Music /> },
      { path: "companion", element: <Companion /> },
      { path: "family", element: <Family /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PasswordGate>
      <RouterProvider router={router} />
    </PasswordGate>
  </StrictMode>,
);
