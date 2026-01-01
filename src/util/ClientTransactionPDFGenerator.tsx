/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import Icon from "../assets/pdf-icon.png";

interface ITransactionProps {
    _id: string;
    key: string;
    createdAt: string;
    notes?: string;
    balance: string;
    totalBalance: string;
    type: "credit" | "paid";
    amount: number;
}

const ClientTransactionPDFGenerator = ({ data, name }: { data: ITransactionProps[]; name: string }) => {
    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.text(`${name} Transaction Report`, 14, 15);
        doc.setFontSize(10);
        doc.text(`Generated: ${moment().format("MMMM Do YYYY, h:mm:ss a")}`, 14, 22);

        const tableData = data.map((item: ITransactionProps, index) => [
            index + 1,
            moment(item.createdAt).format("MMM DD, h:mm A"),
            item.notes || "-",
            item.type.toLocaleUpperCase(),
            item.type === "credit" ? item.amount : 0,
            item.type === "paid" ? item.amount : 0,
            parseFloat(item.totalBalance.toString()) || 0
        ]);

        const totalCredit = tableData.reduce((sum, row) => sum + (row[4] as number), 0);
        const totalPaid = tableData.reduce((sum, row) => sum + (row[5] as number), 0);
        const totalBalance = totalCredit - totalPaid;

        autoTable(doc, {
            startY: 30,
            head: [["SL", "Date", "Notes", "Type", "Credit", "Paid", "Balance"]],
            body: tableData,
            theme: 'grid',
            foot: [
                ["", "", "", "", totalCredit, totalPaid, totalBalance]
            ],
            styles: {
                fillColor: false,
                lineColor: [0, 0, 0],
                lineWidth: 0.1,
                fontSize: 8,
                cellPadding: 2,
                halign: 'left',
            },
            headStyles: {
                fillColor: false,
                textColor: [0, 0, 0],
            },
            bodyStyles: {
                fillColor: false,
                textColor: [0, 0, 0],
            },
            footStyles: {
                fillColor: false,
                textColor: [0, 0, 0],
                fontStyle: 'bold',
                halign: 'left',
            },
        });
        doc.save(`${name}-transactions.pdf`);
    };

    return (
        <img
            src={Icon}
            onClick={downloadPDF}
            style={{ width: 30, height: 30 }}
            className="cursor-pointer"
            alt="logo"
        />
    );
};

export default ClientTransactionPDFGenerator;