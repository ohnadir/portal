import React from "react";
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.png";
import { BanknoteArrowUp, ChartPie, LogOut, UsersRound } from "lucide-react";

interface ISidebarProps {
    setNavigationName: (name: string) => void
}

const Sidebar: React.FC<ISidebarProps> = ({ setNavigationName }) => {
    const navigate = useNavigate();

    const menuItems = [
        {
            id: 1,
            title: "Analaytics",
            icon: <ChartPie size={24} />,
            path: "/"
        },
        {
            id: 2,
            title: "Clients",
            icon: <UsersRound size={24} />,
            path: "/client"
        },
        {
            id: 3,
            title: "Add Credit",
            icon: <BanknoteArrowUp size={24} />,
            path: "/add-credit"
        },
        {
            id: 4,
            title: "Payment Paid",
            icon: <BanknoteArrowUp size={24} />,
            path: "/payment-paid"
        }
    ]



    const handleLogOut = () => {
        navigate("/auth/login")
        localStorage.removeItem("token")
    }

    const handleMenuClick = (path: string, title: string) => {
        setNavigationName(title)
        navigate(path)
    };


    return (
        <div className=''>
            <div className='my-[30px]'>
                <Link to="/">
                    <img src={Logo} style={{ width: 151, height: 50, margin: "0 auto" }} alt="" />
                </Link>
            </div>

            <Menu
                mode="inline"
                defaultSelectedKeys={["item-0"]}
            >
                {
                    menuItems.map((item, index) =>
                        <Menu.Item
                            key={`item-${index}`}
                            icon={item.icon}
                            style={{
                                width: "100%",
                                color: "#415D71",
                                fontSize: "16px",
                                marginBottom: "8px",
                            }}
                            onClick={() => handleMenuClick(item.path, item.title)}
                        >
                            <span className="text-[14px] leading-[21px] relative w-full">
                                {item.title}
                            </span>
                        </Menu.Item>

                    )
                }
            </Menu>

            <div
                onClick={handleLogOut}
                className="flex text-[#415D71] items-center gap-3 cursor-pointer px-6 hover:bg-gray-200 py-2 mx-2 rounded-lg transition-all"
            >
                <LogOut size={24} color="#415D71" />
                Logout
            </div>
        </div>
    )
}

export default Sidebar