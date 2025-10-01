/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Modal, type FormProps } from 'antd';
import React from 'react';
import { useAddCreditMutation } from '../../redux/apiSlices/transactionSlice';

interface ICreditModalProps {
    open: any | null;
    setOpen: (value: any | null) => void;
    refetch: () => void;
    summaryRefetch: () => void;
}

const CreditModal: React.FC<ICreditModalProps> = ({ open, setOpen, refetch, summaryRefetch }) => {

    const [form] = Form.useForm();
    const [addCredit] = useAddCreditMutation();

    const onFinish: FormProps["onFinish"] = async (values) => {
        await addCredit({id: open?._id, body: values}).unwrap().then(() => {
            form.resetFields();
            setOpen(null)
            refetch()
            summaryRefetch();
        })
    };


    return (
        <div>
            <Modal
                title={<p className='text-[#080808] text-[20px] mb-3'>Add Credit</p>}
                open={open}
                width={320}
                onCancel={() => setOpen(null)}
                footer={false}
            >
                <Form onFinish={onFinish} form={form} style={{ marginTop: 20 }} layout="vertical" className="grid grid-cols-12 gap-4">
                    <Form.Item
                        className="col-span-12"
                        style={{ marginBottom: 0 }}
                        label={<p className='text-[#636363] text-[16px] leading-[24px]'>Amount</p>}
                        name="amount"
                    >
                        <Input prefix={<p className='text-[25px] font-bold mb-[5px]'>৳</p>} placeholder='0' style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>

                    <Form.Item
                        className="col-span-12"
                        style={{ marginBottom: 0 }}
                        label={<p className='text-[#636363] text-[16px] leading-[24px]'>Description</p>}
                        name="description"
                    >
                        <Input
                            placeholder='Any note do you have?'
                            style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>

                    <button
                        className="text-white cursor-pointer col-span-12 font-medium flex items-center justify-center gap-2 bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] h-11 rounded-[90px]"
                        style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)", width: "100%" }}
                    >
                        Confirm
                    </button>
                </Form>
            </Modal>
        </div>
    );
};

export default CreditModal;