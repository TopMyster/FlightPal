import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
<main>
    <div className={styles.introtext}>
       <img src="favicon.ico" alt="App Logo" />
      <nav>
        <a href="/page.js">Home</a>
        <a href="page.js"></a>
        <a href="page.js">Home</a>
        <a href="page.js">Home</a>
      </nav>
      <h1>Your Travel Companion . All in an App.</h1>
    </div>
</main>
  );
}
