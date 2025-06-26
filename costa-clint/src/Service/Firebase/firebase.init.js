// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0ZOPwp1wUPFSC_Nrtt_5YI2a_tsHGn3c",
    authDomain: "clints-projects.firebaseapp.com",
    projectId: "clints-projects",
    storageBucket: "clints-projects.firebasestorage.app",
    messagingSenderId: "179232152262",
    appId: "1:179232152262:web:6c8331fa602f707b9dd5c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app