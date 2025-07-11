import Image from "next/image";
import styles from "./page.module.css";
import Navbar from '../components/navbar';
import Link from 'next/link';


export default function Home() {
  return (
<main className={styles.main}>
  <Navbar />
  <div className={styles.introtextcontainer}>
    <div className={styles.mainintrotext}>
      <h1>Your Travel Companion. All in an App.</h1>
    </div>
    <div className={styles.paragraphintrotext}>
      <p>The only travel app that allows you to find flights, track your plane, give alerts about your flights, and log them—All in one practical and clean app.</p>
    </div>
  </div>
  
  <div className={styles.showcaseContainer}>
  <Image 
  className={styles.showcase}
  src={'/iPhoneholding.avif'}
  width={532}
  height={725}
  alt="showcase"
  />
  </div>
</main>
  );
}