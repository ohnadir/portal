/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, DatePicker, Input, Table } from 'antd';
import { PencilLine, Search, Trash2 } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';
import { useDeleteTransactionMutation } from '../../redux/apiSlices/transactionSlice';
import UpdateTransactionModal from '../modal/UpdateTransactionModal';
import Swal from 'sweetalert2';
import ClientTransactionPDFGenerator from '../../util/ClientTransactionPDFGenerator';


interface ITransactionProps {
    _id: string;
    key: string;
    createdAt: string;
    paid: string;
    balance: string;
    credit: string;
    notes?: string;
    type: "credit" | "paid";
    amount: number;
    totalBalance: string;
}

interface IPaginationProps {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}

interface ITransactionTableProps {
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    page: number;
    limit: number;
    transactions: ITransactionProps[];
    pagination: IPaginationProps;
    refetch: () => void;
    name: string;
    totalCredit: number;
    totalPaid: number;
    balance: string;
    setToDate: (value: string) => void;
    setFromDate: (value: string) => void;
    setSearchTerm: (value: string) => void;
}

const TransactionTable: React.FC<ITransactionTableProps> = ({ name, transactions, setToDate, setFromDate, pagination, refetch, setPage, limit, setLimit, page, totalCredit, totalPaid, balance, setSearchTerm }) => {
    const [open, setOpen] = useState<ITransactionProps | null>(null);
    const [deleteTransaction] = useDeleteTransactionMutation();
    const itemsPerPage = 10;


    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedValues, setSelectedValues] = useState<ITransactionProps[]>([]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
            setSelectedValues(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
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
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (_: string, value: ITransactionProps) => (
                <span>{moment(value?.createdAt).format("MMM DD H:mm A")}</span>
            ),
        },
        {
            title: "Notes",
            dataIndex: "notes",
            key: "notes",
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
            dataIndex: "totalBalance",
            key: "totalBalance",
            render: (_: string, value: ITransactionProps) => (
                <span className="text-blue-500">{value?.totalBalance}</span>
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
                        <p className='text-[16px] text-center leading-[24px] text-[#080808] font-medium'>Total Credit <span className=' text-[#008000] pl-1'>{totalCredit || 0} </span></p>
                    </div>
                    <div className='rounded-[66px] flex items-center justify-center bg-white w-[200px] py-2' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                        <p className='text-[16px] text-center leading-[24px] text-[#080808] font-medium'>Total Paid <span className='text-[#FF4040] pl-1'>{totalPaid || 0}</span></p>
                    </div>
                    <div className='rounded-[66px] flex items-center justify-center bg-white w-[200px] py-2' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                        <p className='text-[16px] text-center leading-[24px] text-[#080808] font-medium'>Total Balance <span className='text-[#FF4040] pl-1'>{balance || 0}</span></p>
                    </div>
                </div>
                <div className='flex items-center justify-end gap-4'>
                    {selectedRowKeys.length > 0 && (
                        <div>
                            <ClientTransactionPDFGenerator data={selectedValues} name={name} />
                        </div>
                    )}
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
                    <ConfigProvider
                        theme={{
                            token: {
                                colorTextPlaceholder: "black"
                            }
                        }}
                    >
                        <DatePicker
                            placeholder="From Date"
                            style={{
                                width: 150,
                                height: 44,
                                borderRadius: 60,
                                background: "white",
                            }}
                            onChange={(_date, dateString) => setFromDate(dateString.toString())}
                        />
                    </ConfigProvider>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorTextPlaceholder: "black"
                            }
                        }}
                    >
                        <DatePicker
                            placeholder="To Date"
                            style={{
                                width: 150,
                                height: 44,
                                borderRadius: 60,
                                background: "white",
                            }}
                            onChange={(_date, dateString) => setToDate(dateString.toString())}
                        />
                    </ConfigProvider>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={transactions?.map((transaction: any) => ({ ...transaction, key: transaction._id }))}
                rowSelection={rowSelection}
                pagination={{
                    current: parseInt(page.toString()),
                    pageSize: limit,
                    showSizeChanger: true,
                    total: pagination?.total,
                    onChange: (page, limit) => {
                        setPage(page);
                        setLimit(limit);
                    },
                    showTotal: (total, range) => (
                        <div className='absolute w-fit z-10 bottom-0 left-0 right-0'>
                            Showing {range[0]}–{range[1]} out of {total}
                        </div>
                    ),

                }}
                bordered
            />
            <UpdateTransactionModal open={open} setOpen={setOpen} refetch={refetch} />
        </div>
    );
};

export default TransactionTable;