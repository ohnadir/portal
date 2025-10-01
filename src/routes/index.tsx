import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Home from "../Pages/Home";
import Clients from "../Pages/Clients";
import Credits from "../Pages/Credits";
import Paid from "../Pages/Paid";
import Account from "../Pages/Account";
import ClientDetails from "../Pages/ClientDetails";
import Auth from "../layouts/Auth/Auth";
import Login from "../Pages/Auth/Login";
import PrivateRoute from "./PrivateRoutes";

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
                path: "/account-settings",
                element: <Account/>
            }
            ,
            {
                path: "/client-details/:id",
                element: <ClientDetails/>
            },
            
        ]
    },
    {
        path: "/auth",
        element: <Auth />,
        children: [
            {
                path: "/auth",
                element: <Login />,
            }
        ]
    },
]);

export default router;