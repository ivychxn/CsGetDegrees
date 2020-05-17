const firebase = require('firebase');
const config = require('../config');
const app = firebase.initializeApp(config);
const db = app.firestore();

module.exports = {
    app, db
}

module.exports.getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        db.collection("/users").doc(userId).get().then(doc => {
            resolve(doc.data())
        }).catch(error => {
            reject(error);
        })
    });
}