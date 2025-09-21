import React, { type ReactElement } from 'react';
interface IStatisticTitle {
    title: string;
    icon: ReactElement
}

const StatisticTitle: React.FC<IStatisticTitle> = ({ title, icon }) => {
    return (
        <div className='flex items-center gap-3'>
            <div className='w-11 h-11 bg-[#F1F1F1] flex rounded-full items-center justify-center'>
                {icon}
            </div>
            <p className='font-medium text-[18px] leading-[24px]'>{title}</p>
        </div>
    )
}

export default StatisticTitle