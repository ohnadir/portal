import { Button, Switch } from "antd";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import TransactionTable from "../components/ClientDetails/TransactionTable";
import { useParams } from "react-router-dom";
import { useClientDetailsQuery } from "../redux/apiSlices/clientSlice";
import moment from "moment";



const ClientDetails: React.FC = () => {
    const {id} = useParams();
    console.log(id);
    const [status, setStatus] = useState(true);
    const {data: clientDetails} = useClientDetailsQuery(id);
    console.log(clientDetails);
    return (
        <div className="">

            <div className='rounded-[16px] p-3 bg-white mb-3' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>

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
                    </SquarePen>} style={{ height: 40, border: "1px solid #0058D4", borderRadius: 90 }}  >
                        <p className="bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] bg-clip-text text-transparent">Edit Profile</p>
                    </Button>
                </div>


                <div className="flex item-center justify-between">
                    <div className="grid grid-cols-2 gap-y-2">
                        <p className="text-[#929292]">User Name</p>
                        <p className="font-medium text-[#636363]">{clientDetails?.name}</p>

                        <p className="text-[#929292]">Email</p>
                        <p className="font-medium text-[#636363]">{clientDetails?.email}</p>

                        <p className="text-[#929292]">Address</p>
                        <p className="font-medium text-[#636363]">{clientDetails?.address}</p>

                        <p className="text-[#929292]">Contact No</p>
                        <p className="font-medium text-[#636363]">{clientDetails?.contact}</p>

                        <p className="text-[#929292]">Reg. Date</p>
                        <p className="font-medium text-[#636363]">{moment(clientDetails?.createdAt ).format("l")}</p>
                    </div>


                    {/* Note */}
                    <div className="">
                        <h1 className="text-[#636363] font-medium mb-2">Description/Notes</h1>
                        <p className="border border-[#E0E0E0] rounded-[25px] text-[#818181] text-[14px] p-3">
                            {clientDetails?.notes ? clientDetails?.notes : "N/A"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[16px] p-6" style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                <TransactionTable  transactions={clientDetails?.transactions}  />
            </div>
        </div>
    );
}

export default ClientDetails;