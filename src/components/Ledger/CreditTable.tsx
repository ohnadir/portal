import { ConfigProvider, Table } from 'antd'
import React, { useState } from 'react'

interface ICreditTableProps {
    page: number;
    setPage: (page: number) => void;
}

const CreditTable: React.FC<ICreditTableProps> = ({ page, setPage }) => {

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
            render: (_:number, record:string, index:number) => <p>{(page - 1) * 10 + index + 1}</p>,
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
            render: (_:number, record:string) => (
                <div className=" flex items-center gap-4">
                    <p>
                        Add credit {record}
                    </p>
                </div>
            ),
        },
    ];

    return (
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
    )
}

export default CreditTable;