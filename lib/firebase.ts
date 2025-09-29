// firebase.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8JFIIZnwmcd6q3uuT_RgS7ICNQhezLVw",
  authDomain: "templ-41b47.firebaseapp.com",
  projectId: "templ-41b47",
  storageBucket: "templ-41b47.appspot.com", // ✅ fixed
  messagingSenderId: "772826553083",
  appId: "1:772826553083:web:dd946e7322b2093f99ae5e",
  measurementId: "G-9VS2R2G475",
};

// Initialize Firebase app (singleton pattern to avoid re-init in Next.js)
let app: FirebaseApp;
if (!globalThis.firebaseApp) {
  app = initializeApp(firebaseConfig);
  globalThis.firebaseApp = app;
} else {
  app = globalThis.firebaseApp;
}

// Initialize services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
