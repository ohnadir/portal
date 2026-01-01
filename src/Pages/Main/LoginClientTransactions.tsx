/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, DatePicker, Input, Table } from 'antd';
import { Search } from 'lucide-react';
import moment from 'moment';
import ClientTransactionPDFGenerator from '../../util/ClientTransactionPDFGenerator';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useClienTransactionsQuery } from '../../redux/apiSlices/clientSlice';


interface ITransactionProps {
    _id: string;
    key: string;
    createdAt: string;
    paid: string;
    balance: string;
    totalBalance: string;
    credit: string;
    notes?: string;
    type: "credit" | "paid";
    amount: number;
}

const LoginClientTransactions = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedValues, setSelectedValues] = useState<ITransactionProps[]>([]);
    const { clientId } = useParams();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [fromDate, setFromDate] = useState<string | undefined>(undefined);
    const [toDate, setToDate] = useState<string | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState<string | undefined>("");
    const { data: transactions } = useClienTransactionsQuery({ id: clientId!, page, searchTerm, fromDate, toDate, limit });

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
            setSelectedValues(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
        }
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
        }
    ];

    return (
        <div className='container mx-auto mp-10 border border-gray-300 rounded-2xl p-4 h-screen'>
            <div className='flex items-end justify-end mb-3'>
                <div className='flex items-center justify-end gap-4'>
                    {selectedRowKeys.length > 0 && (
                        <div>
                            <ClientTransactionPDFGenerator data={selectedValues} name={""} />
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
                dataSource={transactions?.transactions?.map((transaction: any) => ({ ...transaction, key: transaction._id }))}
                rowSelection={rowSelection}
                pagination={{
                    current: parseInt(page.toString()),
                    pageSize: limit,
                    showSizeChanger: true,
                    total: transactions?.pagination?.total,
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
        </div>
    );
};

export default LoginClientTransactions;