import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpjpDlgToiJFXQBDpStDJKxZsF90oVQNA",
  authDomain: "todo-list-a94ab.firebaseapp.com",
  projectId: "todo-list-a94ab",
  storageBucket: "todo-list-a94ab.appspot.com",
  messagingSenderId: "212972576694",
  appId: "1:212972576694:web:3eebfb288d8682bc68eb17"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);