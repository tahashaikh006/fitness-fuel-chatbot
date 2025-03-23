const Razorpay = require("razorpay");

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

async function createPayment(orderId, amount) {
    const payment = await instance.orders.create({
        amount: amount * 100, // Amount in paise
        currency: "INR",
        receipt: `order_${orderId}`
    });
    return payment.id;
}

module.exports = createPayment;
