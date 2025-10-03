import React, { useEffect } from 'react';
import { Form, Input, Modal, Switch, type FormProps } from 'antd';
import { useUpdateClientMutation } from "../../redux/apiSlices/clientSlice";

interface IClientUpdateModalProps {
    open: object | null;
    setOpen: (value: object | null) => void;
    refetch: () => void;
}

const ClientUpdateModal: React.FC<IClientUpdateModalProps> = ({ open, setOpen, refetch }) => {

    const [updateClient] = useUpdateClientMutation();
    const [form] = Form.useForm();

    const onFinish: FormProps["onFinish"] = async (values) => {
        await updateClient({id: (open as any)?._id, body:values}).unwrap().then(() => {
            form.resetFields();
            setOpen(null)
            refetch()
        })
    };
    useEffect(() => {
        if (open) {
            form.setFieldsValue(open)
        }
    }, [open])

    return (
        <div>
            <Modal
                title={<p className='text-[#2375D0] text-[20px]'>Update Client Details</p>}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={open !== null}
                width={720}
                onCancel={() => setOpen(null)}
                footer={false}
            >
                <Form form={form} onFinish={onFinish} style={{ marginTop: 20 }} layout="vertical" className="grid grid-cols-12 gap-4">
                    <Form.Item
                        className="col-span-6"
                        style={{ marginBottom: 0 }}
                        label="Username"
                        name="name"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input
                            placeholder='Enter username'
                            style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }}
                        />
                    </Form.Item>

                    <Form.Item
                        className="col-span-6"
                        style={{ marginBottom: 0 }}
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input placeholder='Enter email' style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>

                    <Form.Item className="col-span-6" style={{ marginBottom: 0 }} label="Address" name="address" rules={[{ required: true, message: "Please input your address!" }]}>
                        <Input placeholder='Enter Address' style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>
                    <Form.Item className="col-span-6" style={{ marginBottom: 0 }} label="Contact No." name="contact" rules={[{ required: true, message: "Please input your contact!" }]}>
                        <Input placeholder='Enter Contact No.' style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>

                    <Form.Item className="col-span-12" style={{ marginBottom: 0 }} label="Details/Note" name="notes">
                        <Input.TextArea placeholder='Enter Details' style={{ borderRadius: 14, height: 110, border: "1px solid #E0E0E0" }} />
                    </Form.Item>

                    {/* <Form.Item
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
                    </Form.Item> */}

                    {/* <Form.Item
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
                    </Form.Item> */}

                    <div className="col-span-12 flex items-center gap-2">
                        <Form.Item
                            name="status"
                            valuePropName="checked"
                            noStyle
                        >
                            <Switch defaultChecked />
                        </Form.Item>

                        <p className="text-[#7F7F7F]">
                            <span className="font-bold text-black">Active</span> (kindly confirm your client activity)
                        </p>
                    </div>



                    <div className="col-span-12 flex justify-center">
                        <button
                            className="text-white cursor-pointer font-medium w-[486px] flex items-center justify-center gap-2 bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] h-11 rounded-[90px]"
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

export default ClientUpdateModal;