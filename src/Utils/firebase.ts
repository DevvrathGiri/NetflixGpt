// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJy0iBp3t7JAALnp8yoVbgmOpyy4tQlqA",
  authDomain: "githubgpt-356cf.firebaseapp.com",
  projectId: "githubgpt-356cf",
  storageBucket: "githubgpt-356cf.firebasestorage.app",
  messagingSenderId: "392673385126",
  appId: "1:392673385126:web:e811c6649bd35c88af3267",
  measurementId: "G-W9JJ3ZB9LS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();