import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
//import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAC1lt4j4KnC-Q5hvfFIufq1IoH-QBz-xs",
  authDomain: "dogood-30afe.firebaseapp.com",
  projectId: "dogood-30afe",
  storageBucket: "dogood-30afe.firebasestorage.app",
  messagingSenderId: "328523326660",
  appId: "1:328523326660:web:71718f75cd1beff47f1591"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);