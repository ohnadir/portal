/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, Input, Modal, notification, type FormProps } from 'antd';
import { useAddClientMutation, useCheckUsernameMutation } from "../../redux/apiSlices/clientSlice";

interface IClientModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    refetch: () => void;
}

const ClientModal: React.FC<IClientModalProps> = ({ open, setOpen, refetch }) => {

    const [addClient] = useAddClientMutation();
    const [checkUsername] = useCheckUsernameMutation();
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const onFinish: FormProps["onFinish"] = async (values) => {
        console.log(values);
        await addClient(values)
            .unwrap()
            .then(() => {
                form.resetFields();
                setOpen(false)
                refetch();
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
        <div>
            {contextHolder}
            <Modal
                title={<p className='text-[#2375D0] text-[20px]'>Add Client Details</p>}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={open}
                width={720}
                onCancel={() => setOpen(false)}
                footer={false}
            >
                <Form form={form} onFinish={onFinish} style={{ marginTop: 20 }} layout="vertical" className="grid grid-cols-12 gap-4">
                    <Form.Item
                        className="col-span-6"
                        style={{ marginBottom: 0 }}
                        label="Full name"
                        name="name"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input
                            placeholder='Enter Full Name'
                            style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }}
                        />
                    </Form.Item>

                    <Form.Item
                        className="col-span-6"
                        style={{ marginBottom: 0 }}
                        label="Email"
                        name="email"
                    >
                        <Input placeholder='Enter email' style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>
                    <Form.Item 
                        className="col-span-12"
                        style={{ marginBottom: 0 }} 
                        label="Username" 
                        name="username"
                        rules={[
                            { required: true, message: "Please input your username!" },
                            {
                                validator: async (_, value) => {
                                    if (value && value.trim() !== '') {
                                        try {
                                            const result = await checkUsername({ username: value }).unwrap();  // Call the mutation
                                            if (result.exists) {  // Assuming the response has a 'exists' property
                                                return Promise.reject(new Error('Username already exists'));
                                            }
                                            return Promise.resolve();  // Username is available
                                        } catch (error:any) {
                                            return Promise.reject(new Error('Username already exists'));
                                        }
                                    }
                                    return Promise.resolve();  // No value, so no error
                                },
                            }
                        ]}
                    >
                        <Input placeholder='Enter username' style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>

                    <Form.Item className="col-span-6" style={{ marginBottom: 0 }} label="Address" name="address">
                        <Input placeholder='Enter Address' style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>
                    <Form.Item className="col-span-6" style={{ marginBottom: 0 }} label="Contact No." name="contact">
                        <Input placeholder='Enter Contact No.' style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>

                    <Form.Item className="col-span-12" style={{ marginBottom: 0 }} label="Details/Note" name="notes">
                        <Input.TextArea placeholder='Enter Details' style={{ borderRadius: 14, height: 110, border: "1px solid #E0E0E0" }} />
                    </Form.Item>

                    <Form.Item
                        className="col-span-6"
                        style={{ marginBottom: 0 }}
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                        hasFeedback
                    >
                        <Input.Password
                            placeholder='Enter Client password'
                            style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }}
                        />
                    </Form.Item>

                    <Form.Item
                        className="col-span-6"
                        style={{ marginBottom: 0 }}
                        label="Confirm Password"
                        name="confirm_password"
                        rules={[{ required: true, message: "Please input your confirm password!" }, ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        })]}
                        hasFeedback
                    >
                        <Input.Password placeholder='Enter Client confirm password' style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>

                    <div className="col-span-12 flex justify-center">
                        <button
                            className="text-white font-medium w-[486px] flex items-center justify-center gap-2 bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] h-11 rounded-[90px]"
                            style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)" }}
                        >
                            Confirm
                        </button>
                    </div>
                </Form>

            </Modal>
        </div>
    );
};

export default ClientModal;