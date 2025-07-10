import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/firebase-auth";

const auth = getAuth();
auth.languageCode = 'it';

import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbUbbKHsO0gvHHBrUqTIxpZ7KVxbRsTFw",
  authDomain: "flightpal-7f48c.firebaseapp.com",
  projectId: "flightpal-7f48c",
  storageBucket: "flightpal-7f48c.firebasestorage.app",
  messagingSenderId: "59888725941",
  appId: "1:59888725941:web:cd28103130a2283e8133fc",
  measurementId: "G-DFCQ8JCGXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FlightPal",
  description: "Your Travel Companion . All in an App.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
