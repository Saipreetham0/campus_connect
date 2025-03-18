// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCKsBYPEzCcnDF8O4nRpg8DM0ztRMAuw9Q",
  authDomain: "campus-connect-bcaaa.firebaseapp.com",
  projectId: "campus-connect-bcaaa",
  storageBucket: "campus-connect-bcaaa.firebasestorage.app",
  messagingSenderId: "788684280068",
  appId: "1:788684280068:web:9666d2a79fc6d746d3c051"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;