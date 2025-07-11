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
      <p>FlightPal is your all-in-one travel companion, designed to simplify your journey from takeoff to touchdown. Our intuitive tool helps you quickly find the best flights to your chosen destination, then seamlessly suggests nearby hotels to make your stay comfortable and convenient. Whether you're planning a getaway to Barcelona, Austin, Texas, Lagos, Nigeria, or Bangkok, Thailand, FlightPal ensures you have everything you need for a smooth and enjoyable trip.</p>
    </div>
  </div>
<a href="/signup" > <button className={styles.signupbutton}>Sign Up</button></a>
  </center>
    <div className={styles.introtext}>

    </div>
</main>
  );
}
