// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvV1dvAqag9IWzV5PPBLCBGlpIkfNlfm0",
  authDomain: "my-expense-tracker-app-a1ec0.firebaseapp.com",
  projectId: "my-expense-tracker-app-a1ec0",
  storageBucket: "my-expense-tracker-app-a1ec0.appspot.com",
  messagingSenderId: "547048280451",
  appId: "1:547048280451:web:d75698532af1a84d1666b6",
  measurementId: "G-RPQCH4S8S9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);