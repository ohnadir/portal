import jsPDF from "jspdf";
import html2canvas from 'html2canvas-pro';
import { Table } from "antd";
import Logo from "../assets/credit-manager.png";

const PdfGenerator = () => {
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
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Disabled User',
            age: 99, 
            address: 'Sydney No. 1 Lake Park',
        },
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
                <div className="p-4 border border-red-400 bg-[url(/public/credit-manager.png)] bg-cover">
                    
                    <div className="space-y-2 py-10">
                        <img src={Logo} alt="" />
                        <div>
                            <p>{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        bordered
                    />
                </div>
            </div>
        </div>
    );
};

export default PdfGenerator;