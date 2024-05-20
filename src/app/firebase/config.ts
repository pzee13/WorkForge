// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj7SQwH_3MHWKwplTLjBCG1FP9BHWYTx0",
  authDomain: "setspace-8fa1b.firebaseapp.com",
  projectId: "setspace-8fa1b",
  storageBucket: "setspace-8fa1b.appspot.com",
  messagingSenderId: "613320944863",
  appId: "1:613320944863:web:6bba69dd2cda10d4c7cd6a",
  measurementId: "G-KRHJK9ZL63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);