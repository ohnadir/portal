/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import html2canvas from 'html2canvas-pro';
import { Table } from "antd";
import moment from 'moment';

interface ITransactionProps {
    _id: string;
    key: string;
    client: object;
    createdAt: string;
    paid: string;
    credit: string;
    notes?: string;
    balance: string;
    type: "credit" | "paid";
    amount: number;
}

const PdfGenerator = ({ page, itemsPerPage, data }: { page: number; itemsPerPage: number; data: ITransactionProps[] }) => {
    const downloadPDF = () => {
        const table = document.getElementById("table-to-print");
        if (!table) {
            console.error("Table element not found!");
            return;
        }
        html2canvas(table, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("table-data.pdf");
        });
    };

    const columns = [
        {
            title: "SL",
            dataIndex: "sno",
            key: "sno",
            render: (_: string, _record: ITransactionProps, index: number) => <p>{((page - 1) * itemsPerPage) + index + 1}</p>

        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (_: string, value: ITransactionProps) => (
                <span>{moment(value?.createdAt).format("MMM DD H:mm A")}</span>
            ),
        },
        {
            title: "Notes",
            dataIndex: "notes",
            key: "notes",
        },
        {
            title: 'User',
            dataIndex: 'client',
            key: 'client',
            render: (_: string, _record: ITransactionProps) => <p>{(_record?.client as any)?.name}</p>
        },
        {
            title: "Credit",
            dataIndex: "credit",
            key: "credit",
            render: (_: string, value: ITransactionProps) => (
                <span className="text-black">{value?.type === "credit" ? value?.amount : 0}</span>
            ),
        },
        {
            title: "Paid",
            dataIndex: "paid",
            key: "paid",
            render: (_: string, value: ITransactionProps) => (
                <span className="text-black">{value?.type === "paid" ? value?.amount : 0}</span>
            ),
        },
        {
            title: "Balance",
            dataIndex: "balance",
            key: "balance",
            render: (_: string, value: ITransactionProps) => (
                <span className="text-black">{value?.balance}</span>
            ),
        }
    ];


    return (
        <div>
            <button
                onClick={downloadPDF}
                className="bg-blue-500 text-white px-3 py-2 rounded"
            >
                Download PDF
            </button>

            <div id="table-to-print" >
                <div className="p-4">
                    <Table
                        columns={columns}
                        dataSource={data?.map((item, index) => ({
                            ...item,
                            sno: index + 1
                        }))}
                        pagination={false}
                        bordered
                    />
                </div>
            </div>
        </div>
    );
};

export default PdfGenerator;