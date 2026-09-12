import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import RulesPage from "./sections/RulesPage.jsx";
import StaffPage from "./sections/StaffPage.jsx";
import NewsPage from "./sections/NewsPage.jsx";
import WikiPage from "./sections/WikiPage.jsx";
import LoginPage from "./sections/LoginPage.jsx";
import AdminPage from "./sections/AdminPage.jsx";
import NewsDetailPage from "./sections/NewsDetailPage.jsx";
import WikiDetailPage from './sections/WikiDetailPage.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/rules",
    element: <RulesPage />,
  },
  {
    path: "/staff",
    element: <StaffPage />,
  },
  {
    path: "/news",
    element: <NewsPage />,
  },
  { path: "/news/:id", element: <NewsDetailPage /> },
  {
    path: "/wiki",
    element: <WikiPage />,
  },
  { path: '/wiki/:id', element: <WikiDetailPage /> },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
