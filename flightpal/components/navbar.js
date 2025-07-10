import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Left: Logo */}
      <div className={styles.navLeft}>
        <Image src="/favicon.ico" alt="FlightPal logo" width={150} height={40} />
      </div>

      {/* Center: Nav Links */}
      <div className={styles.navCenter}>
        <Link href="#" className={styles.navbarlinks}>Pricing</Link>
        <Link href="#" className={styles.navbarlinks}>About</Link>
        <Link href="#" className={styles.navbarlinks}>Press</Link>
        <Link href="#" className={styles.navbarlinks}>Support</Link>
      </div>

      {/* Right: CTA */}
      <div className={styles.navRight}>
        <Link href="#">
          Get Started <span className={styles.icon}><svg style="width:100%;height:100%;" viewBox="0 0 18 18" preserveAspectRatio="none" width="100%" height="100%"><use href="#svg-1576668061_1288"></use></svg></span>
        </Link>
      </div>
    </nav>
  );
}
