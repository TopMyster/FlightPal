import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbUbbKHsO0gvHHBrUqTIxpZ7KVxbRsTFw",
  authDomain: "flightpal-7f48c.firebaseapp.com",
  projectId: "flightpal-7f48c",
  storageBucket: "flightpal-7f48c.firebasestorage.app",
  messagingSenderId: "59888725941",
  appId: "1:59888725941:web:cd28103130a2283e8133fc",
  measurementId: "G-DFCQ8JCGXC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//connectAuthEmulator(auth, "http://localhost:9099");

const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;

  const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
  console.log(userCredential.user);
}

export {auth};


