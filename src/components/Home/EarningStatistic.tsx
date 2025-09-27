import { ConfigProvider, Select } from 'antd';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Jan',
        uv: 4000,
        pv: 2400,
    },
    {
        name: 'Feb',
        uv: 3000,
        pv: 1398,
    },
    {
        name: 'Mar',
        uv: 2000,
        pv: 9800,
    },
    {
        name: 'Apr',
        uv: 2780,
        pv: 3908,
    },
    {
        name: 'May',
        uv: 1890,
        pv: 4800,
    },
    {
        name: 'Jun',
        uv: 2390,
        pv: 3800,
    },
    {
        name: 'Jul',
        uv: 3490,
        pv: 4300,
    },
    {
        name: 'Aug',
        uv: 3490,
        pv: 4300,
    },
    {
        name: 'Sep',
        uv: 3490,
        pv: 4300,
    },
    {
        name: 'Oct',
        uv: 3490,
        pv: 4300,
    },
    {
        name: 'Nov',
        uv: 3490,
        pv: 4300,
    },
    {
        name: 'Dec',
        uv: 3490,
        pv: 4300,
    },
];

const EarningStatistic: React.FC = () => {
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
                        data={data}
                        margin={{
                            left: -6,
                        }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default EarningStatistic;