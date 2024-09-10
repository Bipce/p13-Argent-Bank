import axios from "axios";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { RootState, store } from "./app/store.ts";
import { setToken } from "./features/auth/authSlice.ts";
import router from "./routes";
import "./styles/main.css";

axios.defaults.baseURL = import.meta.env.VITE_APP_DB_URL;
axios.interceptors.request.use((config) => {
    const state: RootState = store.getState();
    const token = state.auth.token;

    config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

const token = localStorage.getItem("token");
if (token) {
  store.dispatch(setToken(token));
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
