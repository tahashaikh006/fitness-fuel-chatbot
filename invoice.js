const PDFDocument = require("pdfkit");
const fs = require("fs");

async function generateInvoice() {
    const doc = new PDFDocument();
    const filePath = `invoices/Invoice_${Date.now()}.pdf`;
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.text("Invoice #12345");
    doc.text("Customer: John Doe");
    doc.text("Amount: ₹500");
    doc.text("Status: Paid");

    doc.end();
    return new Promise((resolve) => stream.on("finish", () => resolve(filePath)));
}

module.exports = generateInvoice;
