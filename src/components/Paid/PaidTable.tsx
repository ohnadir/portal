import { ConfigProvider, Input, Select, Table, type TableColumnsType } from 'antd'
import React, { useState } from 'react'
import { useClientsQuery } from '../../redux/apiSlices/clientSlice';
import PaidModal from '../modal/PaidModal';
import CreditModal from '../modal/CreditModal';
import { Info, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import CreditAndPaidPDFGenerator from '../../util/CreditAndPaidPDFGenerator';

interface IPaidTableProps {
    summaryRefetch: () => void;
}

interface IClientProps {
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

const PaidTable: React.FC<IPaidTableProps> = ({ summaryRefetch }) => {
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState<IClientProps | null>(null);
    const [creditOpen, setCreditOpen] = useState<IClientProps | null>(null);
    const [clientStatus, setClientStatus] = useState<"active" | "inactive" | undefined>("active");
    const [search, setSearch] = useState<string | undefined>("");

    const { data: clients, refetch } = useClientsQuery({ page, search, status: clientStatus });
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedValues, setSelectedValues] = useState<IClientProps[]>([]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: IClientProps[]) => {
            setSelectedValues(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
        }
    };

    const columns: TableColumnsType<IClientProps> = [
        {
            title: 'S.No.',
            dataIndex: 'name',
            key: 'name',
            render: (_: string, _record: IClientProps, index: number) => <p>#{index + 1}</p>,
        },
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
            render: (_: string, _record: IClientProps) => <div className='flex items-center gap-2'>
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
            dataIndex: 'balance',
            key: 'balance',
            render: (_: string, _record: IClientProps) => <p>{Number(_record.totalCredit) - Number(_record.totalPaid)}</p>,
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
            render: (_: string, _record: IClientProps) =>
                <div className='flex items-center gap-3'>
                    <Link to={`/client-details/${_record?._id}`}>
                        <Info size={24} color='#606060' />
                    </Link>
                    <button onClick={() => setCreditOpen(_record)} className='cursor-pointer bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] text-white px-3 py-1 rounded-[16px]'>Add Credit</button>
                    <button onClick={() => setOpen(_record)} className='cursor-pointer bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] text-white px-3 py-1 rounded-[16px]'>Add Paid</button>
                </div>
        },
    ];

    return (
        <div className='rounded-[16px] bg-white p-3 mt-3' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
            <div className='flex items-center justify-between gap-3 mb-3'>
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
                <div className='flex items-center gap-4'>
                    {selectedRowKeys.length > 0 && (
                        <div>
                            <CreditAndPaidPDFGenerator type="Paid" data={selectedValues} />
                        </div>
                    )}
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
                <Table
                    columns={columns}
                    dataSource={clients?.map((client: IClientProps) => ({ ...client, key: client._id }))}
                    rowSelection={rowSelection}
                    pagination={{
                        current: parseInt(Number(page).toString()),
                        onChange: (page) => setPage(page),
                    }}
                />
            </ConfigProvider>
            <PaidModal summaryRefetch={summaryRefetch} open={open} setOpen={setOpen} refetch={refetch} />
            <CreditModal summaryRefetch={summaryRefetch} open={creditOpen} setOpen={setCreditOpen} refetch={refetch} />
        </div>
    )
}

export default PaidTable;