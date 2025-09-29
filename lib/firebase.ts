import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getFirestore, type Firestore } from "firebase/firestore"

let app: FirebaseApp | null = null

// Firebase config with values directly
const firebaseConfig = {
  apiKey: "AIzaSyDVB8Nztk5hNBKUE6UEkgdFsq4AouRWEIk",
  authDomain: "flight-booking-website-f6466.firebaseapp.com",
  projectId: "flight-booking-website-f6466",
  storageBucket: "flight-booking-website-f6466.appspot.com",
  messagingSenderId: "1022454577001",
  appId: "1:1022454577001:web:50cdb6a87257534d262ff8",
  measurementId: "G-ZN4HP3LZSQ",
}

export function initFirebaseApp(): FirebaseApp {
  if (!app && typeof window !== "undefined") {
    app = initializeApp(firebaseConfig)
  }

  // In case Next.js hot-reloads and caches apps
  if (!app && getApps().length > 0) {
    app = getApps()[0]!
  }

  return app!
}

// Firestore – initialized lazily via initFirebaseApp in client components
export const db: Firestore | null =
  typeof window !== "undefined" && getApps().length > 0
    ? getFirestore(getApps()[0]!)
    : null