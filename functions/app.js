const express = require("express");
const app = express();
const cors = require('cors');

/*****Firebase setup start******/
/*Firebase functions setup*/
const functions = require("firebase-functions");
/*Firebase firestore setup*/
const admin = require("firebase-admin");
const serviceAccount = require("./secrets/ServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
/******Firebase setup end*******/

app.use(cors())

app.get("/punchlist", async (req, res) => {
  let resData = [];
  let querySnapshot = await db.collection("PunchList").get();
  querySnapshot.forEach((doc) => {
    const item = doc.data()
    item.id = doc.id
    resData.push(item);
  });
  res.json(resData);
});

exports.app = functions.https.onRequest(app);
