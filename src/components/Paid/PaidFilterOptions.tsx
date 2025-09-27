import { ConfigProvider, Input, Select } from 'antd';
import { Search } from 'lucide-react';
import React from 'react';
interface IPaidFilterOptionsProps {
    setPage: (page: number) => void;
}

const PaidFilterOptions: React.FC<IPaidFilterOptionsProps> = () => {

    return (
        <div className='flex items-end justify-end gap-2 mb-5'>
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
                        }
                    }
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
                        }
                    }
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
        </div>
    );
};

export default PaidFilterOptions;