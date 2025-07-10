'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContent}>
        {/* Logo */}
        <div className={styles.navLeft}>
          <Image src="/favicon.ico" alt="FlightPal logo" width={150} height={40} />
        </div>
        {/* Desktop Nav */}
        <div className={styles.navCenter}>
          <Link href="#" className={styles.navbarlinks}>Home</Link>
          <Link href="#" className={styles.navbarlinks}>About</Link>
          <Link href="#" className={styles.navbarlinks}>FAQ</Link>
          <Link href="#" className={styles.navbarlinks}>Support</Link>
        </div>

        {/* CTA */}
        <div className={styles.navRight}>
          <Link href="signup">
            Get Started 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 18" className={styles.icon}>
              <path
                d="M 5.25 3.75 L 6.75 3.75 M 3.75 16.5 L 8.25 16.5 C 9.493 16.5 10.5 15.493 10.5 14.25 L 10.5 3.75 C 10.5 2.507 9.493 1.5 8.25 1.5 L 3.75 1.5 C 2.507 1.5 1.5 2.507 1.5 3.75 L 1.5 14.25 C 1.5 15.493 2.507 16.5 3.75 16.5 Z"
                fill="none"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        </div>
    </nav>
  );
}
