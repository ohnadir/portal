import { Form, Input, Modal, Switch } from 'antd';
import React from 'react';

interface IClientModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const ClientModal: React.FC<IClientModalProps> = ({ open, setOpen }) => {
    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };
    return (
        <div>
            <Modal
                title={<p className='text-[#2375D0] text-[20px]'>Add Client Details</p>}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={open}
                width={720}
                onCancel={() => setOpen(false)}
                footer={false}
            >
                <Form style={{ marginTop: 20 }} layout="vertical" className="grid grid-cols-12 gap-4">
                    <Form.Item className="col-span-6" style={{ marginBottom: 0 }} label="Username" name="username">
                        <Input placeholder='Enter username' style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>
                    <Form.Item className="col-span-6" style={{ marginBottom: 0 }} label="Email" name="email">
                        <Input placeholder='Enter email' style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>

                    <Form.Item className="col-span-6" style={{ marginBottom: 0 }} label="Address" name="address">
                        <Input placeholder='Enter Address' style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>
                    <Form.Item className="col-span-6" style={{ marginBottom: 0 }} label="Contact No." name="contact_number">
                        <Input placeholder='Enter Contact No.' style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>

                    <Form.Item className="col-span-12" style={{ marginBottom: 0 }} label="Details/Note" name="details">
                        <Input.TextArea placeholder='Enter Details' style={{ borderRadius: 14, height: 110, border: "1px solid #E0E0E0" }} />
                    </Form.Item>

                    <Form.Item className="col-span-6" style={{ marginBottom: 0 }} label="Password" name="password">
                        <Input.Password placeholder='Enter Client password' style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>
                    <Form.Item className="col-span-6" style={{ marginBottom: 0 }} label="Confirm Password" name="confirm_password">
                        <Input.Password placeholder='Enter Client confirm password' style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>

                    <div className="col-span-12 h-[1px] bg-[#E0E0E0] my-2"></div>

                    <Form.Item
                        className="col-span-12"
                        style={{ marginBottom: 0 }}
                        name="status"
                        valuePropName="checked"
                    >
                        <div className="flex items-center gap-2">
                            <Switch defaultChecked onChange={onChange} />
                            <p className="text-[#7F7F7F]">
                                <span className="font-bold text-black">Active</span> (kindly confirm your client activity)
                            </p>
                        </div>
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