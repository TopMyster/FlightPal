import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Flight search and booking functions
export async function searchFlights(searchParams) {
  const { from, to, departure_date, passengers, class_type } = searchParams
  
  // This would integrate with flight APIs like Amadeus
  // For now, we'll return mock data
  return {
    flights: [
      {
        id: '1',
        airline: 'Delta',
        flight_number: 'DL1234',
        from,
        to,
        departure_time: '08:00',
        arrival_time: '11:30',
        duration: '3h 30m',
        price: 299,
        available_seats: 45,
        aircraft: 'Boeing 737'
      },
      {
        id: '2',
        airline: 'American',
        flight_number: 'AA5678',
        from,
        to,
        departure_time: '14:15',
        arrival_time: '17:45',
        duration: '3h 30m',
        price: 349,
        available_seats: 23,
        aircraft: 'Airbus A320'
      }
    ]
  }
}

export async function createBooking(bookingData) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select()
  
  if (error) throw error
  return data[0]
}

export async function getUserBookings(userId) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function updateBookingStatus(bookingId, status) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', bookingId)
    .select()
  
  if (error) throw error
  return data[0]
}
