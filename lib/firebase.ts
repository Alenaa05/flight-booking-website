import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB8JFIIZnwmcd6q3uuT_RgS7ICNQhezLVw",
  authDomain: "templ-41b47.firebaseapp.com",
  projectId: "templ-41b47",
  storageBucket: "templ-41b47.appspot.com", // fixed .appspot.com
  messagingSenderId: "772826553083",
  appId: "1:772826553083:web:dd946e7322b2093f99ae5e",
  measurementId: "G-9VS2R2G475",
};

let app: FirebaseApp;

export function initFirebaseApp(): FirebaseApp {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  return app;
}

//  Firestore instance (lazy singleton)
export const db: Firestore = getFirestore(initFirebaseApp());
