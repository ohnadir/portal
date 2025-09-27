import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Home from "../layouts/pages/Home";
import Clients from "../layouts/pages/Clients";
import Credits from "../layouts/pages/Credits";
import Paid from "../layouts/pages/Paid";
import Ledger from "../layouts/pages/Ledger";

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
            }
        ]
    }
]);

export default router;