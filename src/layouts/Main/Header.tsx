import React from 'react';
import { Link } from 'react-router-dom';
import { useProfileQuery } from '../../redux/apiSlices/userSlice';

interface IHeaderProps {
    navigationName: string
}

const Header: React.FC<IHeaderProps> = ({ navigationName }) => {
    const { data: profile } = useProfileQuery(undefined);
    return (
        <div
            className='bg-white h-[80px] flex items-center justify-between px-10 rounded-bl-[16px] rounded-br-[16px]'
            style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}
        >
            <h1 className='text-[24px] font-medium'>{navigationName}</h1>

            <Link to={"/account-settings"}>
                <div className='flex items-center gap-[10px]' >
                    <img src={profile?.profile} style={{ width: 60, height: 60 }} alt="" />
                    <p className='text-[16px] font-medium leading-6 text-[#575757]'>{profile?.name}</p>
                </div>
            </Link>

        </div>
    )
}

export default Header