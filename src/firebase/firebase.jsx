import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// firebase
const firebaseConfig = {
    apiKey: "AIzaSyCxxE5MnDNr1puUOWuabk3UaWqBkUqB-ko",
    authDomain: "chat-system-bf819.firebaseapp.com",
    projectId: "chat-system-bf819",
    storageBucket: "chat-system-bf819.firebasestorage.app",
    messagingSenderId: "552515855201",
    appId: "1:552515855201:web:20a4c03af24c3331219b20"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);