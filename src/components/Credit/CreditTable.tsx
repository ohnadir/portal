/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigProvider, Switch, Table, type TableColumnsType } from 'antd'
import React, { useState } from 'react'
import FilterOptions from './FilterOptions';
import { CirclePlus, FilePenLine } from 'lucide-react';
import type { RowSelectionType } from 'antd/es/table/interface';

interface ICreditTableProps {
    page: number;
    setPage: (page: number) => void;
}

interface ICreditProps {
    key: string;
    name: string;
    userId: string;
    credit: string;
    paid: string;
    balance: string;
    txid: string;
}


const CreditTable: React.FC<ICreditTableProps> = ({ page, setPage }) => {

    const [selectionType, setSelectionType] = useState<RowSelectionType>('checkbox');

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: ICreditProps[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: ICreditProps) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    const dataSource: ICreditProps[] = [
        {
            key: '1',
            txid: '#C14444FGS',
            userId: '0001',
            name: 'Leonardo DiCaprio',
            credit: '100',
            paid: '50',
            balance: '50',
        },
        {
            key: '2',
            txid: '#C14444FGS',
            userId: '0002',
            name: 'Scarlett Johansson',
            credit: '100',
            paid: '50',
            balance: '50',
        },
        {
            key: '3',
            txid: '#C14444FGS',
            userId: '0003',
            name: 'Tom Hanks',
            credit: '100',
            paid: '50',
            balance: '50',
        },
        {
            key: '4',
            txid: '#C14444FGS',
            userId: '0004',
            name: 'Meryl Streep',
            credit: '100',
            paid: '50',
            balance: '50',
        },
        {
            key: '5',
            txid: '#C14444FGS',
            userId: '0005',
            name: 'Denzel Washington',
            credit: '100',
            paid: '50',
            balance: '50',
        },
        {
            key: '6',
            txid: '#C14444FGS',
            userId: '0006',
            name: 'Jennifer Lawrence',
            credit: '100',
            paid: '50',
            balance: '50',
        },
        {
            key: '7',
            txid: '#C14444FGS',
            userId: '0007',
            name: 'Brad Pitt',
            credit: '100',
            paid: '50',
            balance: '50',
        },
        {
            key: '8',
            txid: '#C14444FGS',
            userId: '0008',
            name: 'Angelina Jolie',
            credit: '100',
            paid: '50',
            balance: '50',
        },
        {
            key: '9',
            txid: '#C14444FGS',
            userId: '0009',
            name: 'Robert Downey Jr.',
            credit: '100',
            paid: '50',
            balance: '50',
        },
        {
            key: '10',
            txid: '#C14444FGS',
            userId: '0010',
            name: 'Emma Stone',
            credit: '100',
            paid: '50',
            balance: '50',
        },
    ];

    const columns: TableColumnsType<ICreditProps> = [
        {
            title: 'S.No.',
            key: 'sNo',
            render: (_: number, _record: ICreditProps, index: number) => <p>{(page - 1) * 10 + index + 1}</p>,
        },
        {
            title: 'Txid ',
            dataIndex: 'txid',
            key: 'txid',
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId'
        },
        {
            title: 'Client',
            dataIndex: 'name',
            key: 'name',
            render: (_: string, _record: ICreditProps, index: number) => <div className='flex items-center gap-2'>
                <img width={35} height={35} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                <p>{_record.name}</p>
            </div>
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
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: number, _record: ICreditProps) => (
                <div className=" flex items-center gap-4">
                    <Switch defaultChecked onChange={onChange} />
                    <FilePenLine size={20} color='#606060' />
                    <CirclePlus size={20} color='#606060' />
                </div>
            ),
        },
    ];




    return (
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
                    dataSource={dataSource}
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

export default CreditTable;