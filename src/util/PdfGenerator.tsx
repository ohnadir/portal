/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";

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

const PdfGenerator = ({ data }: { data: ITransactionProps[] }) => {
    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.text("Transaction Report", 14, 15);
        doc.setFontSize(10);
        doc.text(`Generated: ${moment().format("MMMM Do YYYY, h:mm:ss a")}`, 14, 22);

        const tableData = data.map((item: ITransactionProps, index) => [
            index + 1,
            moment(item.createdAt).format("MMM DD, h:mm A"),
            item.notes || "-",
            (item.client as any)?.name || "-",
            item.type === "credit" ? item.amount : 0,
            item.type === "paid" ? item.amount : 0,
            parseFloat(item.balance) || 0 
        ]);

        const totalCredit = tableData.reduce((sum, row) => sum + (row[4] as number), 0); // Sum Credit column (index 4)
        const totalPaid = tableData.reduce((sum, row) => sum + (row[5] as number), 0); // Sum Paid column (index 5)
        const totalBalance = tableData.reduce((sum, row) => sum + (row[6] as number), 0); // Sum Balance column (index 6)

        autoTable(doc, {
            startY: 30,
            head: [["SL", "Date", "Notes", "Client", "Credit", "Paid", "Balance"]],
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

        doc.save("transactions.pdf");
    };

    return (
        <button
            onClick={downloadPDF}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
        >
            Download PDF
        </button>
    );
};

export default PdfGenerator;