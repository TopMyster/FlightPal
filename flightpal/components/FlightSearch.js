'use client';

import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { searchFlights, createBooking } from '../lib/supabase';
import styles from './FlightSearch.module.css';

export default function FlightSearch() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departure_date: '',
    passengers: 1,
    class_type: 'economy'
  });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await searchFlights(searchParams);
      setFlights(results.flights);
    } catch (error) {
      console.error('Error searching flights:', error);
      alert('Error searching flights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookFlight = async (flight) => {
    if (!user) {
      alert('Please sign in to book a flight');
      return;
    }

    setBooking(true);
    try {
      const bookingData = {
        user_id: user.uid,
        flight_id: flight.id,
        airline: flight.airline,
        flight_number: flight.flight_number,
        from_city: flight.from,
        to_city: flight.to,
        departure_date: searchParams.departure_date,
        departure_time: flight.departure_time,
        arrival_time: flight.arrival_time,
        passengers: searchParams.passengers,
        class_type: searchParams.class_type,
        price: flight.price * searchParams.passengers,
        status: 'confirmed',
        created_at: new Date().toISOString()
      };

      const booking = await createBooking(bookingData);
      alert(`Flight booked successfully! Booking ID: ${booking.id}`);
      
      // Clear search results after successful booking
      setFlights([]);
      setSearchParams({
        from: '',
        to: '',
        departure_date: '',
        passengers: 1,
        class_type: 'economy'
      });
    } catch (error) {
      console.error('Error booking flight:', error);
      alert('Error booking flight. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className={styles.flightSearch}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>From</label>
            <input
              type="text"
              name="from"
              value={searchParams.from}
              onChange={handleInputChange}
              placeholder="New York, NY"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>To</label>
            <input
              type="text"
              name="to"
              value={searchParams.to}
              onChange={handleInputChange}
              placeholder="Los Angeles, CA"
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>Departure Date</label>
            <input
              type="date"
              name="departure_date"
              value={searchParams.departure_date}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Passengers</label>
            <select
              name="passengers"
              value={searchParams.passengers}
              onChange={handleInputChange}
            >
              {[1,2,3,4,5,6,7,8].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label>Class</label>
            <select
              name="class_type"
              value={searchParams.class_type}
              onChange={handleInputChange}
            >
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>
        </div>

        <button type="submit" className={styles.searchBtn} disabled={loading}>
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </form>

      {flights.length > 0 && (
        <div className={styles.results}>
          <h3>Available Flights</h3>
          <div className={styles.flightsList}>
            {flights.map(flight => (
              <div key={flight.id} className={styles.flightCard}>
                <div className={styles.flightHeader}>
                  <div className={styles.airline}>
                    <strong>{flight.airline}</strong>
                    <span>{flight.flight_number}</span>
                  </div>
                  <div className={styles.price}>
                    ${flight.price * searchParams.passengers}
                    <small>for {searchParams.passengers} passenger{searchParams.passengers > 1 ? 's' : ''}</small>
                  </div>
                </div>

                <div className={styles.flightDetails}>
                  <div className={styles.route}>
                    <div className={styles.departure}>
                      <div className={styles.time}>{flight.departure_time}</div>
                      <div className={styles.city}>{flight.from}</div>
                    </div>
                    <div className={styles.duration}>
                      <div className={styles.line}></div>
                      <div className={styles.durationText}>{flight.duration}</div>
                    </div>
                    <div className={styles.arrival}>
                      <div className={styles.time}>{flight.arrival_time}</div>
                      <div className={styles.city}>{flight.to}</div>
                    </div>
                  </div>
                </div>

                <div className={styles.flightFooter}>
                  <div className={styles.aircraft}>
                    <small>{flight.aircraft} • {flight.available_seats} seats available</small>
                  </div>
                  <button 
                    className={styles.bookBtn}
                    onClick={() => handleBookFlight(flight)}
                    disabled={booking}
                  >
                    {booking ? 'Booking...' : 'Book Flight'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
