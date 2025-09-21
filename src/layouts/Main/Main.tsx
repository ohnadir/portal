import type React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState } from 'react';


const Main: React.FC = () => {
    const [navigationName, setNavigationName] = useState("Analaytics")
    return (
        <div
            className="grid grid-cols-12 gap-6 bg-[#ddd6d7]"
            style={{ backgroundColor:"#F9F9F9", boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}
        >   
            <div 
                style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }} 
                className='col-span-2 h-screen overflow-y-auto bg-white px-[25px] rounded-l-[16px] rounded-r-[16px]'
            >
                <Sidebar setNavigationName={setNavigationName} />
            </div>
            <div className="col-span-10 w-full  text-black rounded-md">
                <Header navigationName ={navigationName } />
                <div className="h-[calc(100vh-80px)] overflow-y-auto mt-3">
                    <Outlet />
                </div>
            </div>
         </div >
    )
}

export default Main