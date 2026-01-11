import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWyRw2TLI8kapZly9ptfz8tCHO7ZjfkrM",
  authDomain: "joelraetz-9b7cd.firebaseapp.com",
  projectId: "joelraetz-9b7cd",
  storageBucket: "joelraetz-9b7cd.firebasestorage.app",
  messagingSenderId: "254890817934",
  appId: "1:254890817934:web:dd40fdb1e3eaafbafc0cdf",
  measurementId: "G-KGFNG7DBB9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

let analytics = null;
try {
  analytics = firebase.analytics();
} catch (e) {
  console.warn("Firebase Analytics could not be initialized.", e);
}

let storage: firebase.storage.Storage | null = null;
try {
  storage = firebase.storage();
} catch (e) {
  console.error("Firebase Storage could not be initialized.", e);
}

export { app, analytics, storage };