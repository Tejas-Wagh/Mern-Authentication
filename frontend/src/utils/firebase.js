// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-ca2cc.firebaseapp.com",
  projectId: "mern-auth-ca2cc", 
  storageBucket: "mern-auth-ca2cc.appspot.com",
  messagingSenderId: "676662397218",
  appId: "1:676662397218:web:930149532ce800010dbd7b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);