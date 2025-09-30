import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Home from "../layouts/pages/Home";
import Clients from "../layouts/pages/Clients";
import Credits from "../layouts/pages/Credits";
import Paid from "../layouts/pages/Paid";
import Ledger from "../layouts/pages/Ledger";
import Account from "../layouts/pages/Account";
import ClientDetails from "../layouts/pages/ClientDetails";
import Auth from "../layouts/Auth/Auth";
import Login from "../layouts/pages/Auth/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
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
                path: "/ledger",
                element: <Ledger/>
            },
            {
                path: "/account-settings",
                element: <Account/>
            }
            ,
            {
                path: "/client-details",
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