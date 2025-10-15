/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import Icon from "../assets/pdf-icon.png";

interface ICreditAndPaidProps {
    _id: string;
    key: string;
    name: string;
    totalCredit: number;
    totalPaid: number;
    createdAt: string;
    userId: string;
    profile: string;
    status: "active" | "inactive"
}

const CreditAndPaidPDFGenerator = ({ data, type }: { data: ICreditAndPaidProps[]; type: "Credit" | "Paid" }) => {
    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.text(`${type} Report`, 14, 15);
        doc.setFontSize(10);
        doc.text(`Generated: ${moment().format("MMMM Do YYYY, h:mm:ss a")}`, 14, 22);

        const tableData = data.map((item: ICreditAndPaidProps, index) => [
            index + 1,
            item.name || "-",
            item.totalCredit || "-",
            item.totalPaid || "-",
            parseFloat((item.totalCredit - item.totalPaid).toString()) || 0,
            item.status
        ]);

        const totalCredit = tableData.reduce((sum, row) => sum + (row[2] as number), 0);
        const totalPaid = tableData.reduce((sum, row) => sum + (row[3] as number), 0);
        const totalBalance = tableData.reduce((sum, row) => sum + (row[4] as number), 0);

        autoTable(doc, {
            startY: 30,
            head: [["SL", "Client", "Credit", "Paid", "Balance", "Status"]],
            body: tableData,
            theme: 'grid',
            foot: [
                ["", "", totalCredit, totalPaid, totalBalance, ""]
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
        doc.save(`${type}-Report.pdf`);
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

export default CreditAndPaidPDFGenerator;