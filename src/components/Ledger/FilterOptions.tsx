import { Input, Select } from 'antd';
import { Search } from 'lucide-react';
import React from 'react';
interface IFilterOptionsProps {
    setPage: (page: number) => void;
}

const FilterOptions: React.FC<IFilterOptionsProps> = () => {
    
    return (
        <div className='flex items-end justify-end gap-2'>
            <Input style={{ width: "335px", height: 44, borderRadius: 20, background: "white" }} placeholder="Search" prefix={<div className='w-[36px] h-[36px] rounded-full bg-[#F1F1F1] flex items-center justify-center'><Search /></div>} />
            <div className='w-[110px] h-11 rounded-[90px] bg-white' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                <Select placeholder="Date">
                    <Select.Option value="jack">Jack</Select.Option>
                    <Select.Option value="lucy">Lucy</Select.Option>
                    <Select.Option value="tom">Tom</Select.Option>
                </Select>
            </div>
            <div className='w-[110px] h-11 rounded-[90px] bg-white' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                <Select placeholder="Status">
                    <Select.Option value="jack">Jack</Select.Option>
                    <Select.Option value="lucy">Lucy</Select.Option>
                    <Select.Option value="tom">Tom</Select.Option>
                </Select>
            </div>
        </div>
    );
};

export default FilterOptions;