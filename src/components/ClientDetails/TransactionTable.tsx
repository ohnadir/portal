import { Input, Table } from 'antd';
import { FileText, PencilLine, Search, Trash2 } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';
import { useDeleteTransactionMutation } from '../../redux/apiSlices/transactionSlice';
import UpdateTransactionModal from '../modal/UpdateTransactionModal';
import Swal from 'sweetalert2';


interface ITransactionProps {
    _id: string;
    key: string;
    createdAt: string;
    paid: string;
    balance: string;
    credit: string;
    type: "credit" | "paid";
    amount: number;
}

interface IPaginationProps {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}

interface ITransactionTableProps {
    setPage: (page: number) => void;
    page: number;
    transactions: ITransactionProps[];
    pagination: IPaginationProps;
    refetch: () => void;
    totalCredit: number;
    totalPaid: number;
    balance: string;
    date: string | undefined;
    setDate: (value: string) => void;
    setSearchTerm: (value: string) => void;
}

const TransactionTable: React.FC<ITransactionTableProps> = ({ transactions, pagination, refetch, setPage, page, totalCredit, totalPaid, date, balance, setDate, setSearchTerm }) => {
    const [open, setOpen] = useState<ITransactionProps | null>(null);
    const [deleteTransaction] = useDeleteTransactionMutation();
    const itemsPerPage = 10;

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
                    setOpen(null);
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
            <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center gap-2'>
                    <div className='rounded-[66px] flex items-center justify-center bg-white w-[200px] py-2' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                        <p className='text-[16px] text-center leading-[24px] text-[#080808] font-medium'>Total Credit <span className=' text-[#008000] pl-1'>৳ {totalCredit || 0} </span></p>
                    </div>
                    <div className='rounded-[66px] flex items-center justify-center bg-white w-[200px] py-2' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                        <p className='text-[16px] text-center leading-[24px] text-[#080808] font-medium'>Total Paid <span className='text-[#FF4040] pl-1'>৳ {totalPaid || 0}</span></p>
                    </div>
                    <div className='rounded-[66px] flex items-center justify-center bg-white w-[200px] py-2' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                        <p className='text-[16px] text-center leading-[24px] text-[#080808] font-medium'>Total Balance <span className='text-[#FF4040] pl-1'>৳ {balance || 0}</span></p>
                    </div>
                </div>
                <div className='flex items-center justify-end gap-4'>
                    <FileText size={20} color='blue' />
                    <Input
                        style={{ width: "335px", paddingLeft: 5, height: 44, borderRadius: 60, background: "white" }}
                        placeholder="Search"
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                dataSource={transactions}
                pagination={{
                    current: parseInt(page.toString()),
                    onChange: (page) => setPage(page),
                    total: pagination?.total
                }}
                bordered
                className="shadow-md"
            />
            <UpdateTransactionModal open={open} setOpen={setOpen} refetch={refetch} />
        </div>
    );
};

export default TransactionTable;