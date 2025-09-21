import React from 'react';
import { Link } from 'react-router-dom';

interface IHeaderProps {
    navigationName: string
}

const Header: React.FC<IHeaderProps> = ({ navigationName }) => {
    return (
        <div
            className='bg-white h-[80px] flex items-center justify-between px-10 rounded-bl-[16px] rounded-br-[16px]'
            style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}
        >
            <h1 className='text-[24px] font-medium'>{navigationName}</h1>

            <Link to={"/profile"}>
                <div className='flex items-center gap-[10px]' >
                    <img className='border-[#12354E] border-[3px]' src={"https://cdn-icons-png.flaticon.com/512/9703/9703596.png"} style={{ width: 40, height: 40, borderRadius: "100%" }} alt="" />
                    <p className='text-[16px] font-medium leading-6 text-[#575757]'>Admin</p>
                </div>
            </Link>

        </div>
    )
}

export default Header