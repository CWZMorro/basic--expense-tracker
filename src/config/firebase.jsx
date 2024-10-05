// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuJp7Jk6vLeiW9H14vNem6WNSMADIw6Y4",
  authDomain: "hellofirebase-215e3.firebaseapp.com",
  databaseURL: "https://hellofirebase-215e3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hellofirebase-215e3",
  storageBucket: "hellofirebase-215e3.appspot.com",
  messagingSenderId: "123910358379",
  appId: "1:123910358379:web:1d752087f42a05ec36b82e",
  measurementId: "G-ZJXG5MYR6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = new getFirestore(app);
export const storage = new getStorage(app);