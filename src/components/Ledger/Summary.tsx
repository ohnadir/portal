import React from 'react';

const Summary: React.FC = () => {
    return (
        <div className='flex items-center justify-between gap-2 h-[65px] my-2'>
            <div className='rounded-[16px] bg-white' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                <p className='text-[16px] text-center leading-[24px] text-[#080808] font-medium'>Total Credit <span className='text-[#FF4040]'>$202568</span></p>
            </div>
            <div className='rounded-[16px] bg-white' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                <p className='text-[16px] text-center leading-[24px] text-[#080808] font-medium'>Total Paid <span className='text-[#008000]'>$202568</span></p>
            </div>
            <div className='rounded-[16px] bg-white' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                <p className='text-[16px] text-center leading-[24px] text-[#080808] font-medium'>Balance<span className='text-[#0058D4]'>$202568</span></p>
            </div>
        </div>
    );
};

export default Summary;