import Image from "next/image";
import styles from "./about.module.css";
import Navbar from '/components/Navbar';
import Link from 'next/link';


export default function Home() {
  return (
<main className={styles.main}>
  <center>
  <img src="/favicon.ico" width="410" height="90" alt="Logo" />
      <nav className={styles.nav}>
          <Link href="/" className={styles.navbtn}>Home</Link>
          <Link href="app/about.js" className={styles.navbtn}>About</Link>
          <Link href="/faq" className={styles.navbtn}>FAQ</Link>
        </nav> 
  <div className={styles.introtextcontainer}>
    <div className={styles.mainintrotext}>
      <h1>About</h1>
    </div>
    <div className={styles.paragraphintrotext}>
      <p>T</p>
    </div>
  </div>
<a href="/faq" > <button className={styles.signupbutton}>Sign Up</button></a>
  </center>
    <div className={styles.introtext}>

    </div>
</main>
  );
}
