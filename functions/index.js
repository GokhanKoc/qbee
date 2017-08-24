'use strict';

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



// User tarafından sorulan question sayısını hesaplar...
exports.cardsCount = functions.database.ref("/users/{userId}/cards/{cardId}").onWrite((event) => {

  var collectionRef = event.data.ref.parent;
  var countRef = collectionRef.parent.child('usersCardsCount');

  return countRef.transaction(function(current) {
    if (event.data.exists() && !event.data.previous.exists()) {
      return (current || 0) + 1;
    }
    else if (!event.data.exists() && event.data.previous.exists()) {
      return (current || 0) - 1;
    }
  });
});
