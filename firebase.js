const admin = require("firebase-admin");
const serviceAccount = require("./db/firebase-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-project-id.firebaseio.com"
});

const db = admin.firestore();

async function saveOrder(order) {
    await db.collection("orders").add(order);
}

module.exports = saveOrder;
