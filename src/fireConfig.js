// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTVLxkVfIETJQIuzmXemfPTZY77-Qybys",
  authDomain: "om-sai-drugs.firebaseapp.com",
  projectId: "om-sai-drugs",
  storageBucket: "om-sai-drugs.appspot.com",
  messagingSenderId: "948720937527",
  appId: "1:948720937527:web:e0812f92a55376e3272db2",
  measurementId: "G-NQR2JH5DTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB= getFirestore(app)
export default fireDB