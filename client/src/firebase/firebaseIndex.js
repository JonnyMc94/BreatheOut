import firebase from "firebase";
import "firebase/auth";
import "firebase/app";
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCbT7JVFBOGUJbQReon73bdg6zt3DnOEJg",
    authDomain: "breatheout-eda6c.firebaseapp.com",
    projectId: "breatheout-eda6c",
    storageBucket: "breatheout-eda6c.appspot.com",
    messagingSenderId: "334670461348",
    appId: "1:334670461348:web:88a928a60d43a5d99aa931",
    measurementId: "G-948W80FHDV",
    databaseURL: "https://breatheout-eda6c-default-rtdb.europe-west1.firebasedatabase.app/",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.analytics();

firebase.auth();

const storage = firebase.storage();

export {storage, firebase as default};
