// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestoretore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAdjCyj4STwPDVTceBN8DK1lA-VuXc-Hh4",
    authDomain: "astore-2cb37.firebaseapp.com",
    projectId: "astore-2cb37",
    storageBucket: "astore-2cb37.appspot.com",
    messagingSenderId: "549692717292",
    appId: "1:549692717292:web:55a6dafeade1b71c0a4dc9",
    measurementId: "G-3ESLZHVZ13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const forestore = getFirestoretore(app);