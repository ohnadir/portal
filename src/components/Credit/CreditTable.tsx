/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigProvider, Table, type TableColumnsType } from 'antd'
import React, { useState } from 'react'
import FilterOptions from './FilterOptions';
import type { RowSelectionType } from 'antd/es/table/interface';
import { useClientsQuery } from '../../redux/apiSlices/clientSlice';
import Logo from "../../assets/logo.png";
import CreditModal from '../modal/CreditModal';

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
    summaryRefetch: ()=> void;
}


const CreditTable: React.FC<ICreditTableProps> = ({summaryRefetch}) => {
    const [page, setPage] = useState(1);
    const [selectionType, _setSelectionType] = useState<RowSelectionType>('checkbox');
    const [open, setOpen] = useState<ICreditProps | null>(null);

    const { data: clients, isLoading, refetch } = useClientsQuery(undefined);
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: ICreditProps[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: ICreditProps) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    console.log(clients);
    const columns: TableColumnsType<ICreditProps> = [
        {
            title: 'S.No.',
            dataIndex: 'name',
            key: 'name',
            render: (_: string, _record: ICreditProps, index: number) => <p>{index + 1}</p>,
        },
        {
            title: 'User Id',
            dataIndex: 'userId',
            key: 'userId',
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
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
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
            title: 'Due',
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
            render: (_: string, _record: ICreditProps) => <button onClick={() => setOpen(_record)} className='cursor-pointer bg-[#F57674] text-white px-3 py-1 rounded-[16px]'>Add Credit</button>
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
                            <FilterOptions setPage={setPage} />
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
                                    dataSource={clients}
                                    rowSelection={{
                                        type: selectionType,
                                        ...rowSelection,
                                    }}
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
        </>
    )
}

export default CreditTable;