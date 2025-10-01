import { Input, Table } from 'antd';
import { Search } from 'lucide-react';
import moment from 'moment';
import React from 'react';


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

const TransactionTable: React.FC<{ transactions: ITransactionProps[]; pagination: IPaginationProps }> = ({ transactions, pagination }) => {
    console.log(pagination);

    const columns = [
        {
            title: "S.No",
            dataIndex: "sno",
            key: "sno",

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
                <span>{moment(value?.createdAt ).format("l")}</span>
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
    ];

    return (
        <div>
            <div className='flex items-center justify-end gap-4 mb-3'>
                <Input
                    style={{ width: "335px", paddingLeft: 5, height: 44, borderRadius: 60, background: "white" }}
                    placeholder="Search"
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
                    style={{
                        width: 150,
                        paddingLeft: 12,
                        height: 44,
                        borderRadius: 60,
                        background: "white"
                    }}
                />
            </div>
            <Table
                columns={columns}
                dataSource={transactions}
                pagination={false}
                bordered
                className="shadow-md"
            />
        </div>
    );
};

export default TransactionTable;