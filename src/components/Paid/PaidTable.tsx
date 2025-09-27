import { ConfigProvider, Table } from 'antd'
import React, { useState } from 'react'
import PaidFilterOptions from './PaidFilterOptions';

interface IPaidTableProps {
    page: number;
    setPage: (page: number) => void;
}

const PaidTable: React.FC<IPaidTableProps> = ({ page, setPage }) => {

    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

    const rowSelection = {
        onChange: (selectedRowKeys: number[], selectedRows: string[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: string) => ({
            disabled: record?.name === 'Disabled User',
            // Column configuration not to be checked
            name: record?.name,
        }),
    };

    const columns = [
        {
            title: 'S.No.',
            dataIndex: 'name',
            key: 'name',
            render: (_: number, record: string, index: number) => <p>{(page - 1) * 10 + index + 1}</p>,
        },
        {
            title: 'Company Name',
            dataIndex: 'company_name',
            key: 'company_name',
        },
        {
            title: 'City/Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Industry',
            dataIndex: 'industry',
            key: 'industry',
        },
        {
            title: 'Company Type',
            dataIndex: 'company_type',
            key: 'company_type',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: number, record: string) => (
                <div className=" flex items-center gap-4">
                    <p>
                        Add credit {record}
                    </p>
                </div>
            ),
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
                    },
                    token: {
                        // colorPrimary: "white"
                    },
                }}
            >
                <Table
                    columns={columns}
                    // dataSource={companyData?.companies}
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

export default PaidTable;