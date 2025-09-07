// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGwvmf50YKI6IXwHve7XDKGrVgOmZcas4",
  authDomain: "studyplatform-29621.firebaseapp.com",
  projectId: "studyplatform-29621",
  storageBucket: "studyplatform-29621.firebasestorage.app",
  messagingSenderId: "378597058481",
  appId: "1:378597058481:web:78893ca5e497854c817f90",
  measurementId: "G-6TE0BT58KJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);

console.log("data received by auth",auth);
export const googleProvider = new GoogleAuthProvider();
