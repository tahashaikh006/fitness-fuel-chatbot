const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const axios = require("axios");
const generateInvoice = require("./invoice");
const createPayment = require("./payments");
const saveOrder = require("./firebase");

dotenv.config();
const app = express();
app.use(bodyParser.json());

// Webhook for WhatsApp messages
app.post("/webhook", async (req, res) => {
    console.log("Received:", req.body);
    const message = req.body.payload.payload.text;

    if (message.includes("invoice")) {
        const invoiceUrl = await generateInvoice();
        await sendMessage(req.body.sender, `Here is your invoice: ${invoiceUrl}`);
    } 
    else if (message.includes("pay")) {
        const paymentUrl = await createPayment("order123", 500);
        await sendMessage(req.body.sender, `Complete your payment: ${paymentUrl}`);
    } 
    else {
        await sendMessage(req.body.sender, "Hello! How can I assist you?");
    }

    res.sendStatus(200);
});

// Function to send WhatsApp messages
async function sendMessage(to, text) {
    await axios.post("https://api.gupshup.io/wa/messages", {
        recipient_type: "individual",
        to: to,
        type: "text",
        text: { body: text }
    }, {
        headers: { "Authorization": `Bearer ${process.env.WHATSAPP_API_KEY}` }
    });
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot is running on port ${PORT}`));
