// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8ctv59OFk4Z8bojgC3wieF5AuNwtx45s",
  authDomain: "yanida-vote.firebaseapp.com",
  databaseURL: "https://yanida-vote-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yanida-vote",
  storageBucket: "yanida-vote.appspot.com",
  messagingSenderId: "681471514270",
  appId: "1:681471514270:web:34cf35a338435b9718cd8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getDatabase(app)