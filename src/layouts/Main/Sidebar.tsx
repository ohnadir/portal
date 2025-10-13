/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Menu } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { BanknoteArrowUp, ChartPie, LogOut, Settings, UsersRound } from "lucide-react";

interface ISidebarProps {
    setNavigationName: (name: string) => void;
}

const Sidebar: React.FC<ISidebarProps> = ({ setNavigationName }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            key: "analytics",
            label: "Analytics",
            icon: <ChartPie size={20} />,
            path: "/",
        },
        {
            key: "clients",
            label: "Clients",
            icon: <UsersRound size={20} />,
            path: "/client",
        },
        {
            key: "add-credit",
            label: "Add Credit",
            icon: <BanknoteArrowUp size={20} />,
            path: "/add-credit",
        },
        {
            key: "payment-paid",
            label: "Payment Paid",
            icon: <BanknoteArrowUp size={20} />,
            path: "/payment-paid",
        },
        {
            key: "transactions",
            label: "Transactions",
            icon: <BanknoteArrowUp size={20} />,
            path: "/transactions",
        },
        {
            key: "account-settings",
            label: "Account Settings",
            icon: <Settings size={20} />,
            path: "/account-settings",
        },
    ];

    const currentKey =
        menuItems.find((item) => item.path === location.pathname)?.key || "analytics";

    const handleMenuClick = (e: any) => {
        const clickedItem = menuItems.find((item) => item.key === e.key);
        if (clickedItem) {
            setNavigationName(clickedItem.label);
            navigate(clickedItem.path);
        }
    };

    const handleLogOut = () => {
        navigate("/auth");
        localStorage.removeItem("token");
    };

    return (
        <div className="h-full flex flex-col justify-between py-7">
            <div>
                <div className="mb-[30px]">
                    <Link to="/">
                        <img
                            src={Logo}
                            style={{ width: 151, height: 50, margin: "0 auto" }}
                            alt="logo"
                        />
                    </Link>
                </div>

                <Menu
                    mode="inline"
                    selectedKeys={[currentKey]}
                    onClick={handleMenuClick}
                    items={menuItems.map((item) => ({
                        key: item.key,
                        icon: item.icon,
                        label: item.label,
                    }))}
                />
            </div>

            <div
                onClick={handleLogOut}
                className="flex text-[#415D71] items-center gap-3 cursor-pointer px-6 hover:bg-gray-200 py-2 mx-2 rounded-lg transition-all"
            >
                <LogOut size={24} color="#415D71" />
                Logout
            </div>
        </div>
    );
};

export default Sidebar;
