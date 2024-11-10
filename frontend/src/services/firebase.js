import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import Firebase Auth


const firebaseConfig = {
  apiKey: "AIzaSyCiT7O9Tg38fP1KXMt4xAcdOwDq8mShLnE",
  authDomain: "sarayu-ee254.firebaseapp.com",
  projectId: "sarayu-ee254",
  storageBucket: "sarayu-ee254.firebasestorage.app",
  messagingSenderId: "680196581103",
  appId: "1:680196581103:web:a9d56b144eb01b75115d1a",
  measurementId: "G-619710VELS"
};


const app = initializeApp(firebaseConfig);

//  Firebase Authentication
const auth = getAuth(app);


const analytics = getAnalytics(app);


export { auth, analytics };
