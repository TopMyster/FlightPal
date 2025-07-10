import Image from "next/image";
import styles from "./page.module.css";
import Navbar from '/components/Navbar';
import Link from 'next/link';


export default function Home() {
  return (
<main className={styles.main}>
  <img src="/favicon.ico" width="450" height="100" alt="Logo" />
      <div className={styles.nav}>
        <nav>
          <Link href="/" className={styles.navbtn}>Home</Link>
          <Link href="/about" className={styles.navbtn}>About</Link>
          <Link href="/faq" className={styles.navbtn}>FAQ</Link>
        </nav>
      </div>
  <Navbar/>
  <div className={styles.introtextcontainer}>
    <div className={styles.mainintrotext}>
      <h1>About</h1>
    </div>
    <div className={styles.paragraphintrotext}>
      <p>This is a tool that </p>
    </div>
  </div>
    <div className={styles.introtext}>

    </div>
</main>
  );
}
