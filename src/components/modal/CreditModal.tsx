/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Modal, Table, type FormProps, type TableColumnsType } from 'antd';
import React from 'react';
import { useAddCreditMutation } from '../../redux/apiSlices/transactionSlice';
import Spinner from '../Common/Spinner';
import { useClientDetailsQuery } from '../../redux/apiSlices/clientSlice';
import moment from 'moment';

interface ICreditModalProps {
    open: any | null;
    setOpen: (value: any | null) => void;
    refetch: () => void;
    summaryRefetch: () => void;
}

interface ICreditProps {
    _id: string;
    key: string;
    amount: number;
    createdAt: string;
    type: string;
    status: "active" | "inactive"
}


const CreditModal: React.FC<ICreditModalProps> = ({ open, setOpen, refetch, summaryRefetch }) => {

    const [form] = Form.useForm();
    const [addCredit, { isLoading }] = useAddCreditMutation();
    const { data: clientDetails } = useClientDetailsQuery({ id: open?._id, type: "credit", page: 1, limit: 10 });

    const onFinish: FormProps["onFinish"] = async (values) => {
        await addCredit({ id: open?._id, body: values }).unwrap().then(() => {
            form.resetFields();
            setOpen(null)
            refetch()
            summaryRefetch();
        })
    };

    const columns: TableColumnsType<ICreditProps> = [
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (_: string, _record: ICreditProps) => <p>{_record.amount}</p>,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_: string, _record: ICreditProps) => <p>{moment(_record?.createdAt).format("l")}</p>,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (_: string, _record: ICreditProps) => <p>{_record.type}</p>,
        },
    ];


    return (
        <div>
            <Modal
                title={<p className='text-[#080808] text-[20px] mb-3'>Add Credit</p>}
                open={open}
                width={420}
                onCancel={() => setOpen(null)}
                footer={false}
            >
                <Form onFinish={onFinish} form={form} style={{ marginTop: 20, marginBottom: 15 }} layout="vertical" className="grid grid-cols-12 gap-4">
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
                        name="notes"
                    >
                        <Input
                            placeholder='Any note do you have?'
                            style={{ borderRadius: 90, height: 44, border: "1px solid #E0E0E0" }} />
                    </Form.Item>

                    <button
                        className="text-white cursor-pointer col-span-12 font-medium flex items-center justify-center gap-2 bg-gradient-to-r from-[#0058D4] to-[#3D8CFF] h-11 rounded-[90px]"
                        style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)", width: "100%" }}
                    >
                        {isLoading ? <Spinner /> : 'Confirm'}
                    </button>
                </Form>

                <Table<ICreditProps>
                    columns={columns}
                    dataSource={clientDetails?.transactions?.slice(0, 5)?.map((transactions: any) => ({ ...transactions, key: transactions._id })) || []}
                    pagination={false}
                />
            </Modal>
        </div>
    );
};

export default CreditModal;