import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Home from "../Pages/Home";
import Clients from "../Pages/Clients";
import Credits from "../Pages/Credits";
import Paid from "../Pages/Paid";
import Profile from "../Pages/Profile";
import ClientDetails from "../Pages/ClientDetails";
import Login from "../Pages/Auth/Login";
import PrivateRoute from "./PrivateRoutes";
import Transaction from "../Pages/Transactions";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute> <Main/> </PrivateRoute>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/client",
                element: <Clients/>
            },
            {
                path: "/add-credit",
                element: <Credits/>
            },
            {
                path: "/payment-paid",
                element: <Paid/>
            },
            {
                path: "/transactions",
                element: <Transaction/>
            },
            {
                path: "/account-settings",
                element: <Profile/>
            },
            {
                path: "/client-details/:id",
                element: <ClientDetails/>
            },
            
        ]
    },
    {
        path: "/auth",
        element: <Login />,
        children: [
            {
                path: "/auth",
                element: <Login />,
            },
            {
                path: "login",
                element: <Login />,
            },
        ]
    },
]);

export default router;