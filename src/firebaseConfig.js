import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCEJywZO3UajrDtlqReDLnya3kx0wyZrEQ",
  authDomain: "clinica-dental-6583c.firebaseapp.com",
  projectId: "clinica-dental-6583c",
  storageBucket: "clinica-dental-6583c.firebasestorage.app",
  messagingSenderId: "948232624660",
  appId: "1:948232624660:web:9556649cf576ee2131a501",
  measurementId: "G-DG6PLFEZQ7"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app); 
export default app;