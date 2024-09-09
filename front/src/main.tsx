import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import axios from "axios";
import "./styles/main.css";

axios.defaults.baseURL = import.meta.env.VITE_APP_DB_URL;
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
