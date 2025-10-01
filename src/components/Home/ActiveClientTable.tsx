import { ConfigProvider, Select, Table, type TableColumnsType } from 'antd';
import { Info } from 'lucide-react';
import React from 'react';
import { useActiveClientsQuery, useClientsQuery } from '../../redux/apiSlices/clientSlice';

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

const ActiveClientTable: React.FC = () => {
    const { data: clients} = useActiveClientsQuery(undefined);
    const columns: TableColumnsType<IClientProps> = [
            {
                title: 'S.No.',
                dataIndex: 'name',
                key: 'name',
                render: (_: string, _record: IClientProps, index: number) => <p>{index + 1}</p>,
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
                render: (_: string, _record: IClientProps) => <p>{Number(_record.totalCredit) - Number(_record.totalPaid)}</p>,
            },
            {
                title: 'Actions',
                dataIndex: 'actions',
                key: 'actions',
                render: (_: string, _record: IClientProps) => 
                    <Info size={20} color='#606060' />
            },
        ];

    console.log(clients);

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
                    dataSource={clients?.slice(0, 5)?.map((item: IClientProps, index:string) => ({
                        id: index,
                        ...item
                    }))}
                    pagination={false}
                />
            </ConfigProvider>
        </div>
    );
};

export default ActiveClientTable;