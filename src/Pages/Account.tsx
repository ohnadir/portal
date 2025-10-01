import { Form, Input } from 'antd';
import React from 'react';

const Account: React.FC = () => {
    return (
        <div className='h-full'>
            <div className='rounded-[16px] py-3 pl-3 flex items-center gap-3  bg-white' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                <img className='w-[100px] h-[100px] rounded-full' src="https://randomuser.me/api/portraits/men/75.jpg" alt="Avatar" />
                <div>
                    <h1 className='text-[#414141] mb-1 text-[20px] font-semibold'>Mr. Admin</h1>
                    <p className='text-[18px] leading-[24px] font-bold bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] bg-clip-text text-transparent'>Admin</p>
                </div>
            </div>

            <div className='rounded-[16px] h-[78%] bg-white p-4 mt-3' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                <h1 className='text-black text-[18px] font-medium mb-3'>Change Password</h1>
                <Form layout='vertical' className='grid grid-cols-1 gap-3 w-[40%]' >
                    <Form.Item label={<p className='text-[#636363] leading-[24px]'>Password</p>} style={{ marginBottom: 0 }} name="password">
                        <Input type="password" style={{ border: "1px solid #E0E0E0", height: 48 }} />
                    </Form.Item>

                    <Form.Item label={<p className='text-[#636363] leading-[24px]'>New Password</p>} style={{ marginBottom: 0 }} name="password">
                        <Input type="password" style={{ border: "1px solid #E0E0E0", height: 48 }} />
                    </Form.Item>

                    <Form.Item label={<p className='text-[#636363] leading-[24px]'>Confirm Password</p>} style={{ marginBottom: 0 }} name="password">
                        <Input type="password" style={{ border: "1px solid #E0E0E0", height: 48 }} />
                    </Form.Item>

                    <button
                        className="text-white font-medium  flex items-center justify-center gap-2 bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] h-11 rounded-[90px]"
                        style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}
                    >
                        Confirm
                    </button>
                </Form>
            </div>
        </div>
    );
};

export default Account;