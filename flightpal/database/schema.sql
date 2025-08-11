-- FlightPal Database Schema for Supabase
-- Run these commands in your Supabase SQL editor

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL, -- Firebase UID
    flight_id VARCHAR(50) NOT NULL,
    airline VARCHAR(100) NOT NULL,
    flight_number VARCHAR(20) NOT NULL,
    from_city VARCHAR(100) NOT NULL,
    to_city VARCHAR(100) NOT NULL,
    departure_date DATE NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    passengers INTEGER NOT NULL DEFAULT 1,
    class_type VARCHAR(20) NOT NULL DEFAULT 'economy',
    price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create flight_tracking table (for future flight tracking features)
CREATE TABLE IF NOT EXISTS public.flight_tracking (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    flight_number VARCHAR(20) NOT NULL,
    departure_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled',
    actual_departure_time TIME,
    actual_arrival_time TIME,
    delay_minutes INTEGER DEFAULT 0,
    gate VARCHAR(10),
    terminal VARCHAR(10),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create user_preferences table (for personalized experiences)
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id VARCHAR(255) UNIQUE NOT NULL,
    preferred_class VARCHAR(20) DEFAULT 'economy',
    preferred_airlines TEXT[], -- Array of preferred airline codes
    home_airport VARCHAR(10), -- Primary airport code
    notification_email BOOLEAN DEFAULT true,
    notification_sms BOOLEAN DEFAULT false,
    phone_number VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create alerts table (for flight alerts and notifications)
CREATE TABLE IF NOT EXISTS public.alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    alert_type VARCHAR(50) NOT NULL, -- 'delay', 'gate_change', 'cancellation', etc.
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_departure_date ON public.bookings(departure_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_flight_tracking_user_id ON public.flight_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_flight_tracking_booking_id ON public.flight_tracking(booking_id);
CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON public.alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_booking_id ON public.alerts(booking_id);

-- Set up Row Level Security (RLS) policies
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flight_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Create policies for bookings table
CREATE POLICY "Users can view own bookings" ON public.bookings
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own bookings" ON public.bookings
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own bookings" ON public.bookings
    FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own bookings" ON public.bookings
    FOR DELETE USING (auth.uid()::text = user_id);

-- Create policies for flight_tracking table
CREATE POLICY "Users can view own flight tracking" ON public.flight_tracking
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own flight tracking" ON public.flight_tracking
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own flight tracking" ON public.flight_tracking
    FOR UPDATE USING (auth.uid()::text = user_id);

-- Create policies for user_preferences table
CREATE POLICY "Users can view own preferences" ON public.user_preferences
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own preferences" ON public.user_preferences
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own preferences" ON public.user_preferences
    FOR UPDATE USING (auth.uid()::text = user_id);

-- Create policies for alerts table
CREATE POLICY "Users can view own alerts" ON public.alerts
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own alerts" ON public.alerts
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own alerts" ON public.alerts
    FOR UPDATE USING (auth.uid()::text = user_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at timestamps
CREATE TRIGGER handle_updated_at_bookings
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_user_preferences
    BEFORE UPDATE ON public.user_preferences
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Insert some sample data (optional - for testing)
-- This will only work if you have a user with the specified user_id
/*
INSERT INTO public.bookings (
    user_id, flight_id, airline, flight_number, from_city, to_city,
    departure_date, departure_time, arrival_time, passengers, class_type, price, status
) VALUES (
    'sample-firebase-uid', 'DL1234', 'Delta', 'DL1234', 'New York, NY', 'Los Angeles, CA',
    '2024-12-25', '08:00:00', '11:30:00', 1, 'economy', 299.00, 'confirmed'
);
*/
