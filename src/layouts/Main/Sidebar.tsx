import React from "react";
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.png";
import { BanknoteArrowUp, ChartPie, LogOut, Settings, SquarePen, UsersRound } from "lucide-react";
import ExchangeModal from "../../components/modal/ExcelModal";
import { useRetrieveCurrencyQuery } from "../../redux/apiSlices/currencySlice";
import moment from 'moment';

interface ISidebarProps {
    setNavigationName: (name: string) => void
}

const Sidebar: React.FC<ISidebarProps> = ({ setNavigationName }) => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const {data: currency, refetch} = useRetrieveCurrencyQuery(undefined);

    const menuItems = [
        {
            id: 1,
            title: "Analytics",
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
        },
        {
            id: 5,
            title: "Account Settings",
            icon: <Settings size={24} />,
            path: "/account-settings"
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
        <div className='h-full flex flex-col justify-between py-7'>
            <div>
                <div className='mb-[30px]'>
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

                <div className="bg-[#F4F4F4] p-3 rounded-[16px]">
                    <h1 className="text-[#080808]  leading-[24px]">Today's Real rate</h1>
                    <p className="text-[#606060]  leading-[24px] mt-2">Updated In: {currency?.updatedAt ? moment(currency?.updatedAt).format("l") : new Date().toLocaleDateString("en-GB")}</p>

                    <div className="flex items-center justify-between mt-3 gap-2">
                        <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className="bg-white rounded-[90px] h-10 flex items-center justify-center w-full">
                            <p className="text-[18px] leading-[24px] font-bold bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] bg-clip-text text-transparent">
                                R.1 = ৳ {currency?.rate ? currency?.rate : 0 }
                            </p>
                        </div>
                        <button onClick={()=>setOpen(true)}  className="cursor-pointer bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] !h-10 !w-12 rounded-full flex items-center justify-center"> <SquarePen size={20} color="white" /> </button>
                    </div>
                </div>
            </div>

            <ExchangeModal refetch={refetch} open={open} setOpen={setOpen} />

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