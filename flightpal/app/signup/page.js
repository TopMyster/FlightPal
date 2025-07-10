 'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import styles from './signup.module.css'

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('../');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <center>
       <img src="/favicon.ico" width="430" height="100" alt="Logo" />
    <div className={styles.signupbox}>
      <h1 className={styles.header} >Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input  className={styles.signinput}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input className={styles.signinput}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button  className={styles.subbutton} type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </center>
  );
}
