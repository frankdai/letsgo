// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let getDataFromDatabase = function () {
  return new Promise((resolve, reject)=>{
    const dbRef = ref(getDatabase());
    get(dbRef).then((snapshot)=>{
      resolve(snapshot.val())
    }).catch((error)=>{
      console.error(error)
    })
  })
}

export default async function getData() {
  return await getDataFromDatabase()
}


