import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import Home from "./pages/Home.tsx";
import SignIn from "./pages/SignIn.tsx";
import User from "./pages/User.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "user", element: <User /> },
    ],
  },
]);

export default router;