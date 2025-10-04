import React from 'react'
import StatisticTitle from '../Common/StatisticTitle'
import { BanknoteArrowUp, CircleDollarSign, Info, UsersRound } from 'lucide-react'
import { useSummaryQuery } from '../../redux/apiSlices/clientSlice';

const Statistic: React.FC = () => {
    const { data: summary } = useSummaryQuery(undefined);
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
                    <p className='text-[24px] mt-3 font-medium'>{summary?.totalClient}</p>
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
                    <p className='text-[24px]  mt-3 font-medium'>{summary?.totalCredit}</p>
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
                    <p className='text-[24px] mt-3 font-medium'>{summary?.totalPaid}</p>
                </div>


                <div className='rounded-[16px] p-3 bg-white' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}> 
                    <StatisticTitle
                        title='Balance'
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
                    <p className='text-[24px] mt-3 text-red-700 font-medium'>{summary?.balance}</p>
                </div>
            </div>
        </div>
    )
}

export default Statistic