import { ConfigProvider, Select } from 'antd';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTransactionStatisticQuery } from '../../redux/apiSlices/transactionSlice';


const EarningStatistic: React.FC = () => {
    const { data: statistic} = useTransactionStatisticQuery(undefined);
    return (
        <div className='bg-white p-3 mt-3 rounded-[16px]' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>

            {/* statistic heading */}
            <div className='flex items-center justify-between'>
                <h1>Earning Statistic</h1>
                <div className='flex items-center gap-10'>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-2'>
                            <div className='w-[10px] h-[10px] rounded-full bg-[#1E90FF]' />
                            <p className='text-[12px]'>Credit</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='w-[10px] h-[10px] rounded-full bg-[#FFC107]' />
                            <p className='text-[12px]'>Paid</p>
                        </div>
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
                            <Select placeholder="2025" style={{ width: "100px", height: "40px" }} >
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

            {/* statistic chart */}

            <div style={{ width: '100%', marginTop: 25, height: 260}}>
                <ResponsiveContainer >
                    <LineChart
                        data={statistic}
                        margin={{
                            left: 10,
                        }}
                    >
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="credit" stroke="#1E90FF" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="paid" stroke="#FFC107" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default EarningStatistic;