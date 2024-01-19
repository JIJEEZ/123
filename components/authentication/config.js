// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLhsqhELW-Yidlno7NVYj-b2aeVEX7mEE",
  authDomain: "soil-sampling-f8dfd.firebaseapp.com",
  databaseURL: "https://soil-sampling-f8dfd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "soil-sampling-f8dfd",
  storageBucket: "soil-sampling-f8dfd.appspot.com",
  messagingSenderId: "897027288803",
  appId: "1:897027288803:web:2ec6075de13184ca1c5fd6",
  measurementId: "G-92LJ7Y894M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
