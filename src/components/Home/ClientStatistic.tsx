import { ConfigProvider, Select } from 'antd';
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useClientStatisticQuery } from '../../redux/apiSlices/clientSlice';

const ClientStatistic: React.FC = () => {
    const { data: clients} = useClientStatisticQuery(undefined);
    return (
        <div className='bg-white p-3 mt-3 rounded-[16px]' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
            {/* statistic heading */}
            <div className='flex items-center justify-between'>
                <h1>Client Statistic</h1>
                <div className='flex items-center gap-10'>
                    <div className='flex items-center gap-2'>
                        <div className='w-[10px] h-[10px] rounded-full bg-[#0058D4]' />
                        <p className='text-[12px]'>Client</p>
                    </div>
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
                            <Select placeholder="2025" style={{ width: "100px", height: 30 }} >
                                <Select.Option value="2025">2025</Select.Option>
                                <Select.Option value="2024">2024</Select.Option>
                                <Select.Option value="2023">2023</Select.Option>
                                <Select.Option value="2022">2022</Select.Option>
                                <Select.Option value="2021">2021</Select.Option>
                            </Select>
                        </ConfigProvider>
                    </div>
                </div>
            </div>

            <div style={{ width: '100%', marginTop: 25, height: 273 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={clients}
                        margin={{
                            left: -6,
                        }}
                    >
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Bar dataKey="clients" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ClientStatistic;