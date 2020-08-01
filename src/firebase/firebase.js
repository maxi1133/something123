import firebase from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAU1_zDLux1jFyXaiq1K-Iiska6JjwFEZI",
  authDomain: "testdack-2a4db.firebaseapp.com",
  databaseURL: "https://testdack-2a4db.firebaseio.com",
  projectId: "testdack-2a4db",
  storageBucket: "testdack-2a4db.appspot.com",
  messagingSenderId: "174069519637",
  appId: "1:174069519637:web:a08fa0d17b73f47270451c",
  measurementId: "G-HJ13F3QESP"
};


firebase.initializeApp(firebaseConfig);


export { firebase };