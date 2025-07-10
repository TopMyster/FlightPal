import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
<main>
         <img src="/favicon.ico" width="{100}" />
      <nav>
        <a href="/page.js">Home</a>
        <a href="page.js"></a>
        <a href="page.js">Home</a>
        <a href="page.js">Home</a>
      </nav>
  <div className={styles.introtextcontainer}>
    <div className={styles.mainintrotext}>
      <h1>Your Travel Companion. All in an App.</h1>
    </div>
    <div className={styles.paragraphintrotext}>
      <p>The only travel app that allows you to find flights, track your plane, give alerts about your flights, and log them—All in one practical and clean app.</p>
    </div>
  </div>
    <div className={styles.introtext}>

    </div>
</main>
  );
}
