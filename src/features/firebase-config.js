import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "study-quiz-f259d.firebaseapp.com",
    projectId: "study-quiz-f259d",
    storageBucket: "study-quiz-f259d.appspot.com",
    messagingSenderId: "735850514034",
    appId: "1:735850514034:web:d4f09e9ede8073a0fda4eb",
    measurementId: "G-GGEZH0GV27"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);