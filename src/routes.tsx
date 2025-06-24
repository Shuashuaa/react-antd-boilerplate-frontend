import { createBrowserRouter } from "react-router";
import Layout from "./layout/Layout";
import Form from "./pages/Form";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoutes";
import AuthRedirectRoute from "./components/AuthRedirectRoute";

const router = createBrowserRouter([
    {
        path: "/",
        Component: ProtectedRoute,
        children: [
            {
                path: "/",
                Component: Layout,
                children: [
                    { index: true, Component: Home },
                    { path: "dashboard", Component: Dashboard }
                ],
            }
        ],
    },
    {
        path: "/",
        Component: AuthRedirectRoute,
        children: [
            { path: "login", Component: Login },
            { path: "register", Component: Register },
            { path: "register/:username", Component: Register },
        ],
    },
    {
        path: "/Forms",
        Component: Form,
    },
    {
        path: "*",
        Component: NotFound,
    },
]);

export default router;
