import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCeeTr6KaZCfzp6BvkGN5JmGr2y_baI-Sg",
  authDomain: "oyelabscrud.firebaseapp.com",
  projectId: "oyelabscrud",
  storageBucket: "oyelabscrud.appspot.com",
  messagingSenderId: "872594660059",
  appId: "1:872594660059:web:1ff9459c97d0ebb25e4afe",
  measurementId: "G-WC9SXGVMME",
});

const db = firebaseApp.firestore();

export default db;
