import { Form, Input, Modal, type FormProps } from 'antd';
import React from 'react';
import { useAddCurrencyMutation } from '../../redux/apiSlices/currencySlice';

interface IExchangeModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    refetch: () => void;
}

const ExchangeModal: React.FC<IExchangeModalProps> = ({ open, setOpen, refetch }) => {

    const [form] = Form.useForm();
    const [addCurrency] = useAddCurrencyMutation();

    const onFinish: FormProps["onFinish"] = async (values) => {
        await addCurrency(values).unwrap().then(() => {
            form.resetFields();
            setOpen(false)
            refetch()
        })
    };


    return (
        <div>
            <Modal
                title={<p className='text-[#080808] text-[20px] mb-3'>Fix Real to Takas Price</p>}
                open={open}
                width={320}
                onCancel={() => setOpen(false)}
                footer={false}
            >
                <Form onFinish={onFinish} form={form} style={{ marginTop: 20 }} layout="vertical" className="grid grid-cols-12 gap-4">
                    <Form.Item
                        className="col-span-12"
                        style={{ marginBottom: 0 }}
                        label={<p className='text-[#636363] text-[16px] leading-[24px]'>Today's Rial to Taka Rate</p>}
                        name="rate"
                    >
                        <Input prefix={<p className='text-[25px] font-bold mb-[5px]'>৳</p>} placeholder='0' style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
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

export default ExchangeModal;