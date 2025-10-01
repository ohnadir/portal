import { ConfigProvider, Table, type TableColumnsType } from 'antd'
import React, { useState } from 'react'
import PaidFilterOptions from './PaidFilterOptions';
import { useClientsQuery } from '../../redux/apiSlices/clientSlice';
import type { RowSelectionType } from 'antd/es/table/interface';
import PaidModal from '../modal/PaidModal';

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

const PaidTable: React.FC<IPaidTableProps> = ({ summaryRefetch}) => {
    const [page, setPage] = useState(1)
    const [selectionType, _setSelectionType] = useState<RowSelectionType>('checkbox');
        const [open, setOpen] = useState<IClientProps | null>(null);
    
        const { data: clients, refetch } = useClientsQuery(undefined);
        const rowSelection = {
            onChange: (selectedRowKeys: React.Key[], selectedRows: IClientProps[]) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: (record: IClientProps) => ({
                disabled: record.name === 'Disabled User',
                name: record.name,
            }),
        };
    
        const columns: TableColumnsType<IClientProps> = [
            {
                title: 'S.No.',
                dataIndex: 'name',
                key: 'name',
                render: (_: string, _record: IClientProps, index: number) => <p>#{index + 1}</p>,
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
                render: (_: string, _record: IClientProps) => <div className='flex items-center gap-2'>
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
                render: (_: string, _record: IClientProps) => <button onClick={() => setOpen(_record)} className='cursor-pointer bg-[#F57674] text-white px-3 py-1 rounded-[16px]'>Add Paid</button>
            },
        ];

    return (
        <div className='rounded-[16px] bg-white p-3 mt-3' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
            <PaidFilterOptions setPage={setPage} />
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
             <PaidModal summaryRefetch={summaryRefetch} open={open} setOpen={setOpen} refetch={refetch} />
        </div>
    )
}

export default PaidTable;