/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigProvider, Input, Select, Table, type TableColumnsType } from 'antd';
import type { RowSelectionType } from 'antd/es/table/interface';
import { File, Info, Lock, LockOpen, Plus, Search } from 'lucide-react';
import React, { useState } from 'react';
import ClientModal from '../../components/Clients/ClientModal';
import { useClientsQuery } from '../../redux/apiSlices/clientSlice';
import Logo from "../../assets/logo.png";

interface IClientProps {
    key: string;
    name: string;
    address: string;
    credit: string;
    paid: string;
    due: string;
    profile: string;
}

const Clients: React.FC = () => {
    const [page, setPage] = useState(1);
    const [selectionType, setSelectionType] = useState<RowSelectionType>('checkbox');
    const [open, setOpen] = useState(false);

    const { data: clients, isLoading } = useClientsQuery(undefined);
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
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
            render: (_: string, _record: IClientProps, index: number) => <div className='flex items-center gap-2'>
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
            render: (_: string, _record: IClientProps) => <p>{_record.paid}</p>,
        },
        {
            title: 'Due',
            dataIndex: 'due',
            key: 'due',
            render: (_: string, _record: IClientProps) => <p>{ Number(_record.credit) - Number(_record.paid)}</p>,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: string, _record: IClientProps) => <Info size={20} color='#606060' />,
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
                        <div className='rounded-[16px] bg-white p-3' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>

                            <div className='flex items-center justify-end gap-4 mb-[20px]'>
                                <File size={24} color='#A1A1A1' />
                                <Lock size={24} color='#A1A1A1' />
                                <LockOpen size={24} color='#A1A1A1' />
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
                                    <Select placeholder="View All" style={{ width: 130, height: 44, marginBottom: 0 }} >
                                        <Select.Option value="2025">2025</Select.Option>
                                        <Select.Option value="2024">2024</Select.Option>
                                        <Select.Option value="2023">2023</Select.Option>
                                        <Select.Option value="2022">2022</Select.Option>
                                        <Select.Option value="2021">2021</Select.Option>
                                    </Select>
                                </ConfigProvider>

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
                                    <Select placeholder="View All" style={{ width: 130, background: "white", height: 44, marginBottom: 0 }} >
                                        <Select.Option value="2025">2025</Select.Option>
                                        <Select.Option value="2024">2024</Select.Option>
                                        <Select.Option value="2023">2023</Select.Option>
                                        <Select.Option value="2022">2022</Select.Option>
                                        <Select.Option value="2021">2021</Select.Option>
                                    </Select>
                                </ConfigProvider>

                                <div onClick={() => setOpen(true)} className='w-[139px] cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] h-11 rounded-[90px]' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                                    <Plus color='white' size={16} />
                                    <p className='text-[#FDFDFD] leading-[20px]'>Add Client</p>
                                </div>


                            </div>

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
                                        padding: 12
                                    }
                                }}
                            >
                                <Table<IClientProps>
                                    columns={columns}
                                    dataSource={clients}
                                    rowSelection={{
                                        type: selectionType,
                                        ...rowSelection,
                                    }}
                                    pagination={{
                                        current: parseInt(Number(page).toString()),
                                        onChange: (page) => setPage(page),
                                        showTotal: (total, range) => (
                                            <div className='absolute bottom-0 left-0 right-0'>
                                                Showing {range[0]}–{range[1]} out of {total}
                                            </div>
                                        ),
                                    }}
                                />
                            </ConfigProvider>

                            <ClientModal setOpen={setOpen} open={open} />
                        </div>
                    )
            }
        </>

    );
};

export default Clients;