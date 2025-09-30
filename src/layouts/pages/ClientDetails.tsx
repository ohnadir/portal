import { Table, Input, Button, Switch } from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { SquarePen } from "lucide-react";

const columns = [
    {
        title: "S.No",
        dataIndex: "sno",
        key: "sno",
    },
    {
        title: "TRXID",
        dataIndex: "trxid",
        key: "trxid",
    },
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Credit",
        dataIndex: "credit",
        key: "credit",
        render: (value: number) => (
            <span className="text-red-500">{value !== 0 ? `+ $${value}` : "$0"}</span>
        ),
    },
    {
        title: "Paid",
        dataIndex: "paid",
        key: "paid",
        render: (value: number) => (
            <span className="text-green-500">{value !== 0 ? `$${value}` : "$0"}</span>
        ),
    },
    {
        title: "Balance",
        dataIndex: "balance",
        key: "balance",
        render: (value: number) => (
            <span className="text-blue-500">{value !== 0 ? `$${value}` : "$0"}</span>
        ),
    },
];

const data = Array.from({ length: 15 }).map((_, i) => ({
    key: i,
    sno: `#001200${i}`,
    trxid: `#0012000${i}`,
    date: "22 Oct, 2020",
    credit: i % 2 === 0 ? 2649 : 0,
    paid: i % 3 === 0 ? 2000 : 0,
    balance: 2649 - (i % 3 === 0 ? 2000 : 0),
}));

const ClientDetails: React.FC = () => {
    const [status, setStatus] = useState(true);
    return (
        <div className="">

            <div className='rounded-[16px] p-3 bg-white' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 col-span-2">
                        <img
                            src="https://randomuser.me/api/portraits/men/75.jpg"
                            alt="Profile"
                            className="rounded-full w-20 h-20 object-cover"
                        />
                        <div className="">
                            <h2 className="text-xl font-bold">Asadujjaman</h2>
                            <div className="flex items-center space-x-4 mt-2">
                                <p className="text-gray-500">#0012000</p>
                                <div className="flex items-center gap-2">
                                    <Switch defaultChecked onChange={(e) => setStatus(e)} />
                                    {
                                        status ?
                                            <p className="text-green-500 font-semibold">Active</p>
                                            :
                                            <p className="text-red-500">Disable</p>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                    <Button icon={<SquarePen
                                size={20}
                                stroke="url(#grad)"
                            >
                                <defs>
                                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#0058D4" />
                                        <stop offset="100%" stopColor="#3D8CFF" />
                                    </linearGradient>
                                </defs>
                            </SquarePen>} style={{height: 40, border: "1px solid #0058D4", borderRadius: 90}}  >
                        <p className="bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] bg-clip-text text-transparent">Edit Profile</p>
                    </Button>
                </div>


                <div className="col-span-3 grid grid-cols-2 gap-4 text-gray-700">
                    <p><span className="font-semibold">User Name:</span> Asadujjaman</p>
                    <p><span className="font-semibold">Email:</span> asad@gmail.com</p>
                    <p><span className="font-semibold">Address:</span> 3605 Parker Rd.</p>
                    <p><span className="font-semibold">Contact No:</span> (217) 555-0113</p>
                    <p><span className="font-semibold">Reg. Date:</span> 22 Oct, 2020</p>
                </div>

                {/* Note */}
                <div className="col-span-3">
                    <textarea
                        className="w-full p-3 rounded-lg border shadow-sm focus:ring focus:ring-blue-200"
                        rows={3}
                        placeholder="Details/Notes"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras ex faucibus dui elit id nibh venenatis non quis malesuada.
                    </textarea>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
                {/* Search Bar */}
                <div className="flex justify-between items-center mb-4">
                    <Input
                        placeholder="Search here"
                        prefix={<SearchOutlined />}
                        className="w-64"
                    />
                    <Button>Date</Button>
                </div>

                {/* Ant Design Table */}
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 15, total: 10000 }}
                    bordered
                    className="shadow-md"
                />
            </div>
        </div>
    );
}

export default ClientDetails;