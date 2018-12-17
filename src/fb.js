import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCNPRuLEkgNYQBpQhP-PsVt-tnXuUlpbDo",
    authDomain: "pro-task-b01f6.firebaseapp.com",
    databaseURL: "https://pro-task-b01f6.firebaseio.com",
    projectId: "pro-task-b01f6",
    storageBucket: "pro-task-b01f6.appspot.com",
    messagingSenderId: "291902377806"
};
firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;