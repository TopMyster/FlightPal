'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { searchFlights, getUserBookings } from '../../lib/supabase';
import styles from './dashboard.module.css';
import FlightSearch from '../../components/FlightSearch';
import BookingsList from '../../components/BookingsList';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('search');
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && activeTab === 'bookings') {
      loadBookings();
    }
  }, [user, activeTab]);

  const loadBookings = async () => {
    if (!user) return;
    setLoadingBookings(true);
    try {
      const userBookings = await getUserBookings(user.uid);
      setBookings(userBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Welcome back, {user.email}!</h1>
          <button onClick={handleSignOut} className={styles.signOutBtn}>
            Sign Out
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className={styles.nav}>
        <button
          className={`${styles.navBtn} ${activeTab === 'search' ? styles.active : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Search Flights
        </button>
        <button
          className={`${styles.navBtn} ${activeTab === 'bookings' ? styles.active : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          My Bookings
        </button>
        <button
          className={`${styles.navBtn} ${activeTab === 'profile' ? styles.active : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </nav>

      {/* Content */}
      <main className={styles.main}>
        {activeTab === 'search' && (
          <div className={styles.tabContent}>
            <h2>Find Your Perfect Flight</h2>
            <FlightSearch />
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className={styles.tabContent}>
            <h2>Your Bookings</h2>
            {loadingBookings ? (
              <div className={styles.loadingSpinner}>
                <div className={styles.spinner}></div>
                <p>Loading bookings...</p>
              </div>
            ) : (
              <BookingsList bookings={bookings} onBookingUpdate={loadBookings} />
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className={styles.tabContent}>
            <h2>Profile Settings</h2>
            <div className={styles.profileCard}>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Account Created:</strong> {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
              <p><strong>Last Sign In:</strong> {new Date(user.metadata.lastSignInTime).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
