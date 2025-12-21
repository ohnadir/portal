/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Modal, type FormProps } from 'antd';
import React from 'react';
import { useAddCreditMutation } from '../../redux/apiSlices/transactionSlice';

interface IChangePasswordModalProps {
    open: any | null;
    setOpen: (value: any | null) => void;
}

const ChangePasswordModal: React.FC<IChangePasswordModalProps> = ({ open, setOpen }) => {

    const [form] = Form.useForm();
    const [addCredit] = useAddCreditMutation();

    const onFinish: FormProps["onFinish"] = async (values) => {
        await addCredit({ id: open?._id, body: values }).unwrap().then(() => {
            form.resetFields();
            setOpen(null)
        })
    };


    return (
        <div>
            <Modal
                title={<p className='text-[#080808] text-[20px] mb-3'>Change Client Password</p>}
                open={open}
                width={520}
                onCancel={() => setOpen(null)}
                footer={false}
            >
                <Form form={form} layout='vertical' className='grid grid-cols-1 gap-3 w-[100%]' onFinish={onFinish}>
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
            </Modal>
        </div>
    );
};

export default ChangePasswordModal;