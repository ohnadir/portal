/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigProvider, Input, Select, Table, type TableColumnsType } from 'antd'
import React, { useState } from 'react'
import { useClientsQuery } from '../../redux/apiSlices/clientSlice';
import Logo from "../../assets/logo.png";
import CreditModal from '../modal/CreditModal';
import PaidModal from '../modal/PaidModal';
import { Search } from 'lucide-react';

interface ICreditProps {
    _id: string;
    key: string;
    name: string;
    totalCredit: number;
    totalPaid: number;
    createdAt: string;
    userId: string;
    profile: string;
    status: "active" | "inactive"
}

interface ICreditTableProps {
    summaryRefetch: () => void;
}


const CreditTable: React.FC<ICreditTableProps> = ({ summaryRefetch }) => {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState<ICreditProps | null>(null);
    const [paidOpen, setPaidOpen] = useState<ICreditProps | null>(null);
    const [clientStatus, setClientStatus] = useState<"active" | "inactive" | undefined>("active");
    const [search, setSearch] = useState<string | undefined>("");

    const { data: clients, isLoading, refetch } = useClientsQuery({ page, search, status: clientStatus });
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (e: any) => {
            setSelectedRowKeys(e);
        }
    };

    const columns: TableColumnsType<ICreditProps> = [
        {
            title: 'S.No.',
            dataIndex: 'name',
            key: 'name',
            render: (_: string, _record: ICreditProps, index: number) => <p>{index + 1}</p>,
        },
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
            render: (_: string, _record: ICreditProps) => <div className='flex items-center gap-2'>
                <img width={35} height={35} src={_record.profile} alt="" />
                <p>{_record.name}</p>
            </div>
        },
        {
            title: 'Credit',
            dataIndex: 'totalCredit',
            key: 'totalCredit',
        },
        {
            title: 'Paid',
            dataIndex: 'totalPaid',
            key: 'totalPaid'
        },
        {
            title: 'Balance',
            dataIndex: 'due',
            key: 'due',
            render: (_: string, _record: ICreditProps) => <p>{Number(_record.totalCredit) - Number(_record.totalPaid)}</p>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: string, _record: ICreditProps) =>
                <div className='flex items-center gap-3'>
                    <button onClick={() => setOpen(_record)} className='cursor-pointer bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] text-white px-3 py-1 rounded-[16px]'>Add Credit</button>
                    <button onClick={() => setPaidOpen(_record)} className='cursor-pointer bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] text-white px-3 py-1 rounded-[16px]'>Add Paid</button>
                </div>
        },
    ];

    return (
        <>
            {
                isLoading ?
                    <div className='w-full h-full flex items-center justify-center'>
                        <img src={Logo} alt="" className="w-[140px] h-[50px] mx-auto mb-5" />
                    </div>
                    :
                    (
                        <div className='rounded-[16px] bg-white p-3 mt-3' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                            <div className='flex items-center justify-between mb-3'>
                                <Input
                                    style={{ width: "335px", paddingLeft: 5, height: 44, borderRadius: 60, background: "white" }}
                                    placeholder="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                    prefix={
                                        <div className='w-[36px] h-[36px] rounded-full bg-[#F1F1F1] flex items-center justify-center'>
                                            <Search
                                                size={24}
                                                stroke="url(#grad)"
                                            >
                                                <defs>
                                                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="#0058D4" />
                                                        <stop offset="100%" stopColor="#3D8CFF" />
                                                    </linearGradient>
                                                </defs>
                                            </Search>
                                        </div>
                                    }
                                />
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Select: {
                                                colorBgBase: "#F1F1F1",
                                                colorBgContainer: "#F1F1F1",
                                                borderRadius: 24,
                                                activeBorderColor: "none",
                                                activeOutlineColor: "none",
                                                hoverBorderColor: "none"
                                            },
                                            Pagination: {
                                                itemActiveBg: '#2375D0',
                                                borderRadius: 100,
                                                colorPrimary: 'white',
                                            },
                                        },
                                    }}
                                >
                                    <Select 
                                        onChange={(value) => setClientStatus(value)} 
                                        placeholder="Active" 
                                        style={{ width: 130, height: 44, marginBottom: 0 }} 
                                    >
                                        <Select.Option value="">View All</Select.Option>
                                        <Select.Option value="active">Active</Select.Option>
                                        <Select.Option value="inactive">Inactive</Select.Option>
                                    </Select>
                                </ConfigProvider>
                            </div>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Pagination: {
                                            itemActiveBg: '#2375D0',
                                            borderRadius: 100,
                                            colorPrimary: 'white',
                                        },
                                    }
                                }}
                            >
                                <Table<ICreditProps>
                                    columns={columns}
                                    dataSource={clients?.map((client: any) => ({ ...client, key: client._id }))}
                                    rowSelection={rowSelection}
                                    pagination={{
                                        current: parseInt(Number(page).toString()),
                                        onChange: (page) => setPage(page),
                                    }}
                                />
                            </ConfigProvider>
                        </div>
                    )
            }

            <CreditModal summaryRefetch={summaryRefetch} open={open} setOpen={setOpen} refetch={refetch} />
            <PaidModal summaryRefetch={summaryRefetch} open={paidOpen} setOpen={setPaidOpen} refetch={refetch} />
        </>
    )
}

export default CreditTable;