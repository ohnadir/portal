import React from 'react'
import StatisticTitle from '../Common/StatisticTitle'
import { BanknoteArrowUp, CircleDollarSign, Info, UsersRound } from 'lucide-react'

const Statistic: React.FC = () => {
    return (
        <div >
            <div className='grid grid-cols-4 gap-3'>
                <div className='rounded-[16px] bg-white p-3' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}> 
                    <StatisticTitle
                        title='Clients'
                        icon={
                            <UsersRound
                                size={24}
                                stroke="url(#grad)"
                            >
                                <defs>
                                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#0058D4" />
                                        <stop offset="100%" stopColor="#3D8CFF" />
                                    </linearGradient>
                                </defs>
                            </UsersRound>
                        }
                    />
                    <div className='flex items-center justify-between mt-[15px]'>
                        <div className='flex items-center gap-2'>
                            <p className='text-[#606060]'>Total:</p>
                            <p className='text-[24px] font-medium'>10000</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <p className='text-[#606060]'>Active:</p>
                            <p className='text-[24px] font-medium'>10000</p>
                        </div>

                    </div>
                </div>

                <div className='rounded-[16px] p-3 bg-white' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}> 
                    <StatisticTitle
                        title='Credits'
                        icon={
                            <CircleDollarSign
                                size={24}
                                stroke="url(#grad)"
                            >
                                <defs>
                                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#0058D4" />
                                        <stop offset="100%" stopColor="#3D8CFF" />
                                    </linearGradient>
                                </defs>
                            </CircleDollarSign>
                        }
                    />
                    <div className='flex items-center justify-between mt-[15px]'>
                        <div className='flex items-center gap-2'>
                            <p className='text-[#606060]'>Today</p>
                            <p className='text-[24px] font-medium'>10000</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <p className='text-[#606060]'>Total:</p>
                            <p className='text-[24px] font-medium'>10000</p>
                        </div>

                    </div>
                </div>

                <div className='rounded-[16px] p-3 bg-white'  style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}> 
                    <StatisticTitle
                        title='Paid'
                        icon={
                            <BanknoteArrowUp
                                size={24}
                                stroke="url(#grad)"
                            >
                                <defs>
                                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#0058D4" />
                                        <stop offset="100%" stopColor="#3D8CFF" />
                                    </linearGradient>
                                </defs>
                            </BanknoteArrowUp>
                        }
                    />
                    <div className='flex items-center justify-between mt-[15px]' >
                        <div className='flex items-center gap-2'>
                            <p className='text-[#606060]'>Today:</p>
                            <p className='text-[24px] font-medium'>10000</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <p className='text-[#606060]'>Total:</p>
                            <p className='text-[24px] font-medium'>10000</p>
                        </div>

                    </div>
                </div>


                <div className='rounded-[16px] p-3 bg-white' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}> 
                    <StatisticTitle
                        title='Due'
                        icon={
                            <Info
                                size={24}
                                stroke="url(#grad)"
                                color='#3D8CFF'
                            >
                                <defs>
                                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#0058D4" />
                                        <stop offset="100%" stopColor="#3D8CFF" />
                                    </linearGradient>
                                </defs>
                            </Info>
                        }
                    />
                    <div className='flex items-center justify-between mt-[15px]'>
                        <div className='flex items-center gap-2'>
                            <p className='text-[#606060]'>Today:</p>
                            <p className='text-[24px] text-red-700 font-medium'>- 10000</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <p className='text-[#606060]'>Total:</p>
                            <p className='text-[24px] text-red-700 font-medium'>-10000</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistic