import * as firebase from 'firebase';

// should go in a secret file
const config = {
  apiKey: 'AIzaSyAIx29bLOCA30n7FiAxz247ODRjnvl6-iM',
  authDomain: 'qbee-824d6.firebaseapp.com',
  databaseURL: 'https://qbee-824d6.firebaseio.com',
  projectId: "qbee-824d6",
  storageBucket: 'qbee-824d6.appspot.com',
  messagingSenderId: '1044885558000'
};
firebase.initializeApp(config);

export default firebase;
