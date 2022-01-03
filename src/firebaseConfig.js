// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyC6pFwwbDsBp3k0JPE0vbGmzI0ehotdAcI",
  authDomain: "jokehub6969.firebaseapp.com",
  databaseURL: "https://jokehub6969-default-rtdb.firebaseio.com",
  projectId: "jokehub6969",
  storageBucket: "jokehub6969.appspot.com",
  messagingSenderId: "494799104202",
  appId: "1:494799104202:web:7e5a266be800b7ef9c6c33",
  measurementId: "G-3S70Y68DB0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
