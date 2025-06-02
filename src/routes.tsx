import { createBrowserRouter } from "react-router";
import Layout from "./layout/Layout";
// import App from "./pages/App";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "/register",
        Component: Register,
    },
    {
        path: "/",
        Component: Layout,
        children: [
            { index: true, Component: Home },
            { path: "dashboard", Component: Dashboard }
        ],
    },
    {
        path: "*",
        Component: NotFound,
    },
]);

export default router;