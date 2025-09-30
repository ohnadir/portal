/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigProvider, Table, type TableColumnsType } from 'antd'
import React, { useState } from 'react'
import FilterOptions from './FilterOptions';
import type { RowSelectionType } from 'antd/es/table/interface';
import { useClientsQuery } from '../../redux/apiSlices/clientSlice';
import { Info } from 'lucide-react';
import Logo from "../../assets/logo.png";
import CreditModal from '../modal/CreditModal';

interface ICreditProps {
    key: string;
    name: string;
    address: string;
    credit: string;
    paid: string;
    due: string;
    profile: string;
}


const CreditTable: React.FC = () => {
    const [page, setPage] = useState(1);
    const [selectionType, setSelectionType] = useState<RowSelectionType>('checkbox');
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

    const columns: TableColumnsType<ICreditProps> = [
        {
            title: 'S.No.',
            dataIndex: 'name',
            key: 'name',
            render: (_: string, _record: ICreditProps, index: number) => <p>#{index + 1}</p>,
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
            dataIndex: 'credit',
            key: 'credit',
        },
        {
            title: 'Paid',
            dataIndex: 'paid',
            key: 'paid',
            render: (_: string, _record: ICreditProps) => <p>{_record.paid}</p>,
        },
        {
            title: 'Due',
            dataIndex: 'due',
            key: 'due',
            render: (_: string, _record: ICreditProps) => <p>{Number(_record.credit) - Number(_record.paid)}</p>,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: string, _record: ICreditProps) => <div className='flex items-center gap-3'>
                <Info size={20} color='#606060' />
                <button onClick={() => setOpen(_record)} className='cursor-pointer bg-[#F57674] text-white px-3 py-1 rounded-[16px]'>Add Credit</button>
            </div>,
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
                                    },
                                    token: {
                                        // colorPrimary: "white"
                                    },
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

            <CreditModal open={open} setOpen={setOpen} refetch={refetch} />
        </>
    )
}

export default CreditTable;