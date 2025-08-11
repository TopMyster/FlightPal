'use client';

import { useState } from 'react';
import { updateBookingStatus } from '../lib/supabase';
import styles from './BookingsList.module.css';

export default function BookingsList({ bookings, onBookingUpdate }) {
  const [updating, setUpdating] = useState(null);

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setUpdating(bookingId);
    try {
      await updateBookingStatus(bookingId, 'cancelled');
      onBookingUpdate();
      alert('Booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Error cancelling booking. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#28a745';
      case 'cancelled':
        return '#dc3545';
      case 'pending':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>✈️</div>
        <h3>No bookings yet</h3>
        <p>Start searching for flights to make your first booking!</p>
      </div>
    );
  }

  return (
    <div className={styles.bookingsList}>
      {bookings.map(booking => (
        <div key={booking.id} className={styles.bookingCard}>
          <div className={styles.bookingHeader}>
            <div className={styles.flightInfo}>
              <h3>{booking.airline} {booking.flight_number}</h3>
              <span 
                className={styles.status}
                style={{ backgroundColor: getStatusColor(booking.status) }}
              >
                {booking.status.toUpperCase()}
              </span>
            </div>
            <div className={styles.bookingId}>
              Booking #{booking.id.slice(-8)}
            </div>
          </div>

          <div className={styles.bookingBody}>
            <div className={styles.routeInfo}>
              <div className={styles.route}>
                <div className={styles.departure}>
                  <div className={styles.time}>
                    {formatTime(booking.departure_time)}
                  </div>
                  <div className={styles.city}>{booking.from_city}</div>
                  <div className={styles.date}>
                    {formatDate(booking.departure_date)}
                  </div>
                </div>
                
                <div className={styles.arrow}>
                  <div className={styles.arrowLine}></div>
                  <div className={styles.arrowHead}>→</div>
                </div>
                
                <div className={styles.arrival}>
                  <div className={styles.time}>
                    {formatTime(booking.arrival_time)}
                  </div>
                  <div className={styles.city}>{booking.to_city}</div>
                </div>
              </div>
            </div>

            <div className={styles.bookingDetails}>
              <div className={styles.detail}>
                <span className={styles.label}>Passengers:</span>
                <span className={styles.value}>{booking.passengers}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Class:</span>
                <span className={styles.value}>
                  {booking.class_type.charAt(0).toUpperCase() + booking.class_type.slice(1)}
                </span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Total Price:</span>
                <span className={styles.value}>${booking.price}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Booked on:</span>
                <span className={styles.value}>
                  {new Date(booking.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.bookingFooter}>
            {booking.status === 'confirmed' && (
              <button
                className={styles.cancelBtn}
                onClick={() => handleCancelBooking(booking.id)}
                disabled={updating === booking.id}
              >
                {updating === booking.id ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            )}
            {booking.status === 'cancelled' && (
              <div className={styles.cancelledNote}>
                This booking has been cancelled
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
