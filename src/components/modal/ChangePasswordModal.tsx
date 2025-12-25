/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Modal, notification, type FormProps } from 'antd';
import React from 'react';
import { useUpdateClientPasswordMutation } from '../../redux/apiSlices/clientSlice';

interface IChangePasswordModalProps {
    open: any | null;
    setOpen: (value: any | null) => void;
}

const ChangePasswordModal: React.FC<IChangePasswordModalProps> = ({ open, setOpen }) => {
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    const [updateClientPassword] = useUpdateClientPasswordMutation();

    const onFinish: FormProps["onFinish"] = async (values) => {
        await updateClientPassword({ id: open, body: values }).unwrap().then(() => {
            form.resetFields();
            setOpen(null)
        }).catch((error) => {
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
        <div>
            {contextHolder}
            <Modal
                title={<p className='text-[#080808] text-[20px] mb-3'>Change Client Password</p>}
                open={open}
                width={520}
                onCancel={() => setOpen(null)}
                footer={false}
            >
                <Form form={form} layout='vertical' className='grid grid-cols-1 gap-3 w-[100%]' onFinish={onFinish}>
                    <Form.Item
                        label={<p className='text-[#636363] leading-[24px]'>New Password</p>}
                        style={{ marginBottom: 0 }}
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please input your New Password!",
                            }
                        ]}
                    >
                        <Input.Password type="password" style={{ border: "1px solid #E0E0E0", height: 48 }} />
                    </Form.Item>

                    <Form.Item
                        label={<p className='text-[#636363] leading-[24px]'>Confirm Password</p>}
                        style={{ marginBottom: 0 }}
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Confirm Password!",
                            }
                        ]}
                    >
                        <Input.Password type="password" style={{ border: "1px solid #E0E0E0", height: 48 }} />
                    </Form.Item>

                    <button
                        className="text-white font-medium  flex items-center justify-center gap-2 bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] h-11 rounded-[90px]"
                        style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}
                    >
                        Confirm
                    </button>
                </Form>
            </Modal>
        </div>
    );
};

export default ChangePasswordModal;