import { ConfigProvider, Input, Select, Table } from 'antd';
import { FileText, PencilLine, Trash2 } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useDeleteTransactionMutation, useTransactionsQuery } from '../redux/apiSlices/transactionSlice';
import Logo from "../assets/logo.png";
import UpdateTransactionModal from '../components/modal/UpdateTransactionModal';
import { useClientsQuery } from '../redux/apiSlices/clientSlice';


interface ITransactionProps {
    _id: string;
    key: string;
    client: object;
    createdAt: string;
    paid: string;
    credit: string;
    balance: string;
    type: "credit" | "paid";
    amount: number;
}

const Transaction: React.FC = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [date, setDate] = useState('');
    const [open, setOpen] = useState<ITransactionProps | undefined>(undefined);
    const [deleteTransaction] = useDeleteTransactionMutation();
    const [client, setClient] = useState<string | undefined>(undefined);
    const [type, setType] = useState<string | undefined>(undefined);
    const { data: transactions, isLoading, refetch } = useTransactionsQuery({ page, type, date, client, limit });
    const { data: clients } = useClientsQuery({});
    const itemsPerPage = 10;

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (e: any) => {
            setSelectedRowKeys(e);
        }
    };

    const handleDeleteTransaction = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                await deleteTransaction(id).unwrap().then(() => {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your transaction has been deleted.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })

            }
        });

    };

    const columns = [
        {
            title: "S.No",
            dataIndex: "sno",
            key: "sno",
            render: (_: string, _record: ITransactionProps, index: number) => <p>{((page - 1) * itemsPerPage) + index + 1}</p>

        },
        {
            title: "TRXID",
            dataIndex: "txid",
            key: "txid",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (_: string, value: ITransactionProps) => (
                <span>{moment(value?.createdAt).format("MMM DD H:mm A")}</span>
            ),
        },
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
            render: (_: string, _record: ITransactionProps, _index: number) => <div className='flex items-center gap-2'>
                <img width={35} height={35} src={(_record?.client as any)?.profile} alt="" />
                <p>{(_record?.client as any)?.name}</p>
            </div>
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (_: string, value: ITransactionProps) => (
                <span>{value?.type?.charAt(0).toUpperCase() + value?.type.slice(1)}</span>
            ),
        },
        {
            title: "Credit",
            dataIndex: "credit",
            key: "credit",
            render: (_: string, value: ITransactionProps) => (
                <span className="text-red-500">{value?.type === "credit" ? value?.amount : 0}</span>
            ),
        },
        {
            title: "Paid",
            dataIndex: "paid",
            key: "paid",
            render: (_: string, value: ITransactionProps) => (
                <span className="text-red-500">{value?.type === "paid" ? value?.amount : 0}</span>
            ),
        },
        {
            title: "Balance",
            dataIndex: "balance",
            key: "balance",
            render: (_: string, value: ITransactionProps) => (
                <span className="text-blue-500">{value?.balance}</span>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: string, _record: ITransactionProps) =>
                <div className='flex items-center gap-3'>
                    <PencilLine size={20} className='cursor-pointer' onClick={() => setOpen(_record)} />
                    <Trash2 className='cursor-pointer' size={20} color='red' onClick={() => handleDeleteTransaction(_record._id)} />
                </div>
        },
    ];

    return (
        <div>

            {
                isLoading ?
                    <div className='w-full h-full flex items-center justify-center'>
                        <img src={Logo} alt="" className="w-[140px] h-[50px] mx-auto mb-5" />
                    </div>
                    :
                    (
                        <div className='rounded-[16px] bg-white p-3' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                            <div className='flex items-center justify-between mb-3'>
                                <div className='flex items-center gap-2'>
                                    <div className='rounded-[66px] flex items-center justify-center bg-white w-[200px] py-2' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                                        <p className='text-[16px] text-center leading-[24px] text-[#080808] font-medium'>Total Credit <span className=' text-[#008000] pl-1'>৳ {transactions?.totalCredit || 0} </span></p>
                                    </div>
                                    <div className='rounded-[66px] flex items-center justify-center bg-white w-[200px] py-2' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                                        <p className='text-[16px] text-center leading-[24px] text-[#080808] font-medium'>Total Paid <span className='text-[#FF4040] pl-1'>৳ {transactions?.totalPaid || 0}</span></p>
                                    </div>
                                    <div className='rounded-[66px] flex items-center justify-center bg-white w-[220px] py-2' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                                        <p className='text-[16px] text-center leading-[24px] text-[#080808] font-medium'>Total Balance <span className='text-black pl-1'>৳ {transactions?.balance || 0}</span></p>
                                    </div>
                                </div>
                                <div className='flex items-center justify-end gap-4'>
                                    <FileText size={20} color='blue' />
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
                                        <Select onChange={(value) => setType(value)} placeholder="Type" style={{ width: 160, height: 44, marginBottom: 0 }} >
                                            <Select.Option value={""}>All</Select.Option>
                                            {
                                                [
                                                    { value: "credit", label: "Credit" },
                                                    { value: "paid", label: "Paid" },
                                                ].map((client: any) => (
                                                    <Select.Option value={client.value}>{client.label}</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </ConfigProvider>
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
                                        <Select onChange={(value) => setClient(value)} placeholder="Client " style={{ width: 160, height: 44, marginBottom: 0 }} >
                                            {
                                                clients?.map((client: any) => (
                                                    <Select.Option value={client._id}>{client.name}</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </ConfigProvider>
                                    <Input
                                        type='date'
                                        defaultValue={new Date().toISOString().split("T")[0]}
                                        onChange={(e) => setDate(e.target.value)}
                                        value={date}
                                        style={{
                                            width: 150,
                                            paddingLeft: 12,
                                            height: 44,
                                            borderRadius: 60,
                                            background: "white"
                                        }}
                                    />
                                </div>
                            </div>

                            <Table
                                columns={columns}
                                dataSource={transactions?.transactions?.map((transaction: any) => ({ ...transaction, key: transaction._id }))}
                                rowSelection={rowSelection}
                                pagination={{
                                    current: parseInt(page.toString()),
                                    pageSize: limit,
                                    total: transactions?.pagination?.total,
                                    showSizeChanger: true,
                                    onChange: (page, limit) => {
                                        setPage(page);
                                        setLimit(limit);
                                    },
                                }}

                                bordered
                                className="shadow-md"
                            />
                            <UpdateTransactionModal open={open} setOpen={setOpen} refetch={refetch} />
                        </div>
                    )
            }
        </div>
    );
};

export default Transaction;