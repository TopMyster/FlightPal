import Image from "next/image";
import styles from "./about.module.css";
import Navbar from '/components/Navbar';
import Link from 'next/link';


export default function Home() {
  return (
<main className={styles.main}>
  <center>
     <Navbar/>
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
