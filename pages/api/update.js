const fs = require('fs');
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdjFLkFBSAKodZThBKGYbFa5NcJX2uaS0",
  authDomain: "letsgo-c5445.firebaseapp.com",
  databaseURL: "https://letsgo-c5445-default-rtdb.firebaseio.com",
  projectId: "letsgo-c5445",
  storageBucket: "letsgo-c5445.appspot.com",
  messagingSenderId: "173668811483",
  appId: "1:173668811483:web:871d7e95a0d12f1715c2fe"
};
initializeApp(firebaseConfig);

export default function handler(req, res) {
  try {
    let {key, index, performance} = req.body
    const db = getDatabase();
    set(ref(db, `${key}/performance`), performance).then(()=>{
      res.status(200).json({ success: true })
    })
  } catch (e) {
    res.status(400).json({ success: false })
  }
}