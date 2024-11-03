import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjwp_-A1h_pYHJtlYugRwB01VQWLHppi0",
  authDomain: "training-center-app-4ac38.firebaseapp.com",
  projectId: "training-center-app-4ac38",
  storageBucket: "training-center-app-4ac38.appspot.com",
  messagingSenderId: "59014273948",
  appId: "1:59014273948:web:63478ecd3864648221c659"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };