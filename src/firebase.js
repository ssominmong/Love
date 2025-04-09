// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBIGBzJ9Fx5ljxYgcUwQ2Hqq3wjNJmwGTY",
  authDomain: "love-97c81.firebaseapp.com",
  projectId: "love-97c81",
  storageBucket: "love-97c81.firebasestorage.app",
  messagingSenderId: "465594142071",
  appId: "1:465594142071:web:2654ccf40e90ec2e6ba572",
  measurementId: "G-GL0BXDFZ7Y"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };