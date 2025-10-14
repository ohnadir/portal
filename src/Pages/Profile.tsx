/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, type FormProps } from 'antd';
import React from 'react';
import { useProfileQuery, useUpdatePasswordMutation } from '../redux/apiSlices/userSlice';
import { notification } from 'antd';

const Profile: React.FC = () => {
    const { data: profile } = useProfileQuery(undefined);
    const [api, contextHolder] = notification.useNotification();
    const [updatePassword] = useUpdatePasswordMutation();
    const [form] = Form.useForm();

    const onFinish: FormProps["onFinish"] = async (values) => {
        await updatePassword(values)
            .unwrap()
            .then((data) => {
                form.resetFields();
                api.success({
                    message: 'Success',
                    description: data?.message || 'Password updated successfully.',
                });
            })
            .catch((error) => {
                if (error?.errorMessages?.length > 0) {
                    if (Array.isArray(error.errorMessages)) {
                        error.errorMessages.forEach((err: any) => {
                            api.error({
                                message: 'Error',
                                description: err?.message || 'Something went wrong.',
                            });
                        });
                    }
                } else {
                    api.error({
                        message: 'Error',
                        description: error?.message || 'Something went wrong.',
                    });
                }
            });

    };

    return (
        <div className='h-full'>
            {contextHolder}
            <div className='rounded-[16px] py-3 pl-3 flex items-center gap-3  bg-white' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                <img className='w-[100px] h-[100px] rounded-full' src={profile?.profile} alt="Avatar" />
                <div>
                    <h1 className='text-[#414141] mb-1 text-[20px] font-semibold'>{profile?.name}</h1>
                    <p className='text-[18px] leading-[24px] font-bold bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] bg-clip-text text-transparent'>Admin</p>
                </div>
            </div>

            <div className='rounded-[16px] h-[78%] bg-white p-4 mt-3' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}>
                <h1 className='text-black text-[18px] font-medium mb-3'>Change Password</h1>
                <Form form={form} layout='vertical' className='grid grid-cols-1 gap-3 w-[40%]' onFinish={onFinish}>
                    <Form.Item label={<p className='text-[#636363] leading-[24px]'>Current Password</p>} style={{ marginBottom: 0 }} name="currentPassword">
                        <Input type="password" style={{ border: "1px solid #E0E0E0", height: 48 }} />
                    </Form.Item>

                    <Form.Item label={<p className='text-[#636363] leading-[24px]'>New Password</p>} style={{ marginBottom: 0 }} name="newPassword">
                        <Input type="password" style={{ border: "1px solid #E0E0E0", height: 48 }} />
                    </Form.Item>

                    <Form.Item label={<p className='text-[#636363] leading-[24px]'>Confirm Password</p>} style={{ marginBottom: 0 }} name="confirmPassword">
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

export default Profile;