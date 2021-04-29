import firebase from "firebase";
import "firebase/auth";
import "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCu6RDpWNFTFF48kqIjKfBSwrrdi9112d4",
  authDomain: "breatheout-ce632.firebaseapp.com",
  databaseURL:
    "https://breatheout-ce632-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "breatheout-ce632",
  storageBucket: "breatheout-ce632.appspot.com",
  messagingSenderId: "1070506622440",
  appId: "1:1070506622440:web:841d221aebf01a5e67b85d",
  measurementId: "G-SKD3R8ZSYH",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.analytics();

firebase.auth();

export default firebase;
