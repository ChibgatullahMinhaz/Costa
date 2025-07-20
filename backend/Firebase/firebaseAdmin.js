// firebase.js or firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('../Config/costaAdmin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

