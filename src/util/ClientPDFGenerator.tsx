/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import Icon from "../assets/pdf-icon.png";

interface IClientProps {
    _id: string;
    key: string;
    name: string;
    email: string;
    contact: string;
    balance: string;
    createdAt: string;
    status: "active" | "inactive"
}

const ClientPDFGenerator = ({ data }: { data: IClientProps[] }) => {
    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.text("Client Report", 14, 15);
        doc.setFontSize(10);
        doc.text(`Generated: ${moment().format("MMMM Do YYYY, h:mm:ss a")}`, 14, 22);

        const tableData = data.map((item: IClientProps, index) => [
            index + 1,
            item.name || "-",
            item.email || "-",
            item.contact || "-",
            moment(item.createdAt).format("MMM DD, h:mm A"),
            parseFloat(item.balance) || 0,
            item.status
        ]);

        const totalBalance = tableData.reduce((sum, row) => sum + (row[5] as number), 0);

        autoTable(doc, {
            startY: 30,
            head: [["SL", "Client", "Email", "Contact", "Joining Date", "Balance", "Status"]],
            body: tableData,
            theme: 'grid',
            foot: [
                ["", "", "", "", "", totalBalance, ""]
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
        doc.save("clients.pdf");
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

export default ClientPDFGenerator;