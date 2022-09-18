import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBZimCXz_1Yc1-0BjiuTR-JUGZvV0R3GpA",
    authDomain: "cryptoexchange-902ac.firebaseapp.com",
    projectId: "cryptoexchange-902ac",
    storageBucket: "cryptoexchange-902ac.appspot.com",
    messagingSenderId: "312591602985",
    appId: "1:312591602985:web:91b34995bf33f873091338",
    measurementId: "G-SEFFPR4LJ7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);