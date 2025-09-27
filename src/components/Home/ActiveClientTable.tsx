import { ConfigProvider, Select, Table, type TableColumnsType } from 'antd';
import { Info } from 'lucide-react';
import React from 'react';

interface IClientProps {
    key: string;
    name: string;
    address: string;
    credit: string;
    paid: string;
    due: string;
}

const ActiveClientTable: React.FC = () => {
    const columns: TableColumnsType<IClientProps> = [
        {
            title: 'S.No.',
            dataIndex: 'name',
            key: 'name',
            render: (_: string, record: IClientProps, index: number) => <p>#{index + 1}</p>,
        },
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
            render: (_: string, record: IClientProps, index: number) => <div className='flex items-center gap-2'>
                <img width={35} height={35} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                <p>John {index + 1}</p>
            </div>
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'country',
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
            title: 'Due',
            dataIndex: 'due',
            key: 'due',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: string, record: IClientProps) => <Info size={20} color='#606060' />,
        },
    ];

    const dataSource: IClientProps[] = [
        {
            key: '1',
            name: 'Nadir',
            address: 'Dhaka',
            credit: '100',
            paid: '50',
            due: '50',
        },
        {
            key: '2',
            name: 'John',
            address: 'Dhaka',
            credit: '100',
            paid: '50',
            due: '50',
        },
        {
            key: '3',
            name: 'John',
            address: 'Dhaka',
            credit: '100',
            paid: '50',
            due: '50',
        },
        {
            key: '4',
            name: 'John',
            address: 'Dhaka',
            credit: '100',
            paid: '50',
            due: '50',
        },
        {
            key: '5',
            name: 'John',
            address: 'Dhaka',
            credit: '100',
            paid: '50',
            due: '50',
        },
    ];

    return (
        <div className='bg-white p-3 mt-3 rounded-[16px]' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
            <div className='flex items-center justify-between mb-3'>
                <h1>Client Statistic</h1>
                <div >
                    <ConfigProvider
                        theme={{
                            components: {
                                Select: {
                                    colorBgBase: "#F1F1F1",
                                    colorBgContainer: "#F1F1F1",
                                    borderRadius: 24,
                                    activeBorderColor: "none",
                                    activeOutlineColor: "none",
                                    hoverBorderColor: "none"
                                },
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
                        <Select placeholder="View All" style={{ width: "100px", height: 30 }} >
                            <Select.Option value="2025">2025</Select.Option>
                            <Select.Option value="2024">2024</Select.Option>
                            <Select.Option value="2023">2023</Select.Option>
                            <Select.Option value="2022">2022</Select.Option>
                            <Select.Option value="2021">2021</Select.Option>
                        </Select>
                    </ConfigProvider>
                </div>
            </div>
            <ConfigProvider
                theme={{
                    token: {
                        padding: 7
                    }
                }}
            >
                <Table<IClientProps>
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
            </ConfigProvider>
        </div>
    );
};

export default ActiveClientTable;