import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getFirestore, type Firestore } from "firebase/firestore"

// Firebase config (safe to keep client-side for web apps)
const firebaseConfig = {
  apiKey: "AIzaSyDVB8Nztk5hNBKUE6UEkgdFsq4AouRWEIk",
  authDomain: "flight-booking-website-f6466.firebaseapp.com",
  projectId: "flight-booking-website-f6466",
  storageBucket: "flight-booking-website-f6466.appspot.com",
  messagingSenderId: "1022454577001",
  appId: "1:1022454577001:web:50cdb6a87257534d262ff8",
  measurementId: "G-ZN4HP3LZSQ",
}

let app: FirebaseApp

export function initFirebaseApp(): FirebaseApp {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApp()
  }
  return app
}

// Firestore instance (safe lazy init)
export const db: Firestore = getFirestore(initFirebaseApp())
