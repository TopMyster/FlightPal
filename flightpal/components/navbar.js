'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`${isScrolled ? styles.scrolledContent : styles.navContent}`}>
        {/* Left Logo/Icon */}
        <div className={styles.navLeft}>
  {isScrolled && (
    <>
      <Image
        src="/flightpalwing.png"
        alt="flightpal logo wing"
        width={32}
        height={32}
        className={`${styles.iconLogo} ${styles.logoVisible}`}
      />
      <div className={styles.divider} />
    </>
  )}
  {!isScrolled && (
    <a href="#">
    <Image
      src="/favicon.ico"
      alt="FlightPal Logo"
      width={150}
      height={40}
      className={`${styles.logo} ${styles.logoVisible}`}
    />
    </a>
  )}
</div>


        {/* Nav Links */}
        <div className={styles.navCenter}>
          <Link href="#">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/FAQ">FAQ</Link>
          <Link href="#">Support</Link>
        </div>

        {/* Get Started */}
        <div className={isScrolled ? styles.navRightScrolled : styles.navRight}>
          <Link href="#">
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 18"
              width={16}
              height={16}
            >
              <path
                d="M 5.25 3.75 L 6.75 3.75 M 3.75 16.5 L 8.25 16.5 C 9.493 16.5 10.5 15.493 10.5 14.25 L 10.5 3.75 C 10.5 2.507 9.493 1.5 8.25 1.5 L 3.75 1.5 C 2.507 1.5 1.5 2.507 1.5 3.75 L 1.5 14.25 C 1.5 15.493 2.507 16.5 3.75 16.5 Z"
                fill="none"
                stroke={isScrolled ? "white" : "black"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
