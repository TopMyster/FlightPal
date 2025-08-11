# FlightPal Booking App Setup Guide

FlightPal is a comprehensive flight booking application built with Next.js, Firebase Authentication, and Supabase for data management.

## 🚀 Features

- **User Authentication**: Secure login/signup with Firebase
- **Flight Search**: Search for available flights (currently with mock data)
- **Flight Booking**: Book flights with multiple passengers and classes
- **Booking Management**: View, track, and cancel bookings
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Modern UI with smooth animations

## 📋 Prerequisites

- Node.js (v18 or later)
- Firebase account
- Supabase account
- Git

## 🛠 Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd flightpal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Firebase:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing
   - Enable Authentication with Email/Password
   - Copy your Firebase config from Project Settings

4. **Set up Supabase:**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Create a new project
   - Go to Settings > API to get your keys
   - Run the SQL schema from `database/schema.sql` in the SQL Editor

5. **Configure Environment Variables:**
   ```bash
   cp .env.local.template .env.local
   ```
   
   Fill in your actual values in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

6. **Update Firebase Configuration:**
   Update `lib/firebase.js` with your Firebase config:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     // ... other config
   };
   ```

## 🏃‍♂️ Running the Application

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
flightpal/
├── app/
│   ├── dashboard/          # User dashboard
│   ├── signin/            # Authentication pages
│   ├── signup/
│   └── globals.css        # Global styles
├── components/
│   ├── FlightSearch.js    # Flight search component
│   ├── BookingsList.js    # Bookings management
│   └── navbar.js          # Navigation component
├── context/
│   └── authContext.js     # Firebase auth context
├── lib/
│   ├── firebase.js        # Firebase configuration
│   └── supabase.js        # Supabase client & functions
├── database/
│   └── schema.sql         # Database schema
└── public/                # Static assets
```

## 🗃️ Database Schema

The app uses the following main tables:

- **bookings**: Store flight bookings
- **flight_tracking**: Track flight status (future feature)
- **user_preferences**: User settings and preferences
- **alerts**: Flight notifications and alerts

## 🔧 Configuration

### Firebase Setup
1. Enable Authentication > Sign-in method > Email/Password
2. Add your domain to authorized domains
3. Configure Firebase security rules if needed

### Supabase Setup
1. Run the SQL schema in `database/schema.sql`
2. Enable Row Level Security (RLS) - already configured in schema
3. The schema includes proper indexes and security policies

## 🎯 Usage

1. **Sign Up/Sign In**: Create an account or log in
2. **Search Flights**: Use the search form to find flights
3. **Book Flights**: Select and book your preferred flights
4. **Manage Bookings**: View and cancel bookings in the dashboard
5. **Profile**: View account information

## 🔮 Future Enhancements

- **Real Flight Data**: Integrate with Amadeus or similar flight APIs
- **Payment Integration**: Add Stripe or PayPal for real payments
- **Flight Tracking**: Real-time flight status updates
- **Notifications**: Email/SMS alerts for flight changes
- **Mobile App**: React Native version
- **Advanced Search**: Filters, sorting, multi-city trips

## 🛡️ Security

- Firebase Authentication for secure user management
- Supabase Row Level Security (RLS) for data protection
- Environment variables for sensitive configuration
- Input validation and sanitization

## 🐛 Troubleshooting

### Common Issues:

1. **Firebase Auth Error**: Check your Firebase config and enable Email/Password auth
2. **Supabase Connection Error**: Verify your Supabase URL and API keys
3. **Build Errors**: Make sure all dependencies are installed with `npm install`
4. **Database Errors**: Ensure the SQL schema is properly executed in Supabase

### Environment Variables:
Make sure `.env.local` exists and contains valid values. Never commit this file to version control.

## 📝 API Integration (Future)

To integrate with real flight data:

1. **Amadeus for Developers**: Flight search and booking APIs
2. **Aviationstack**: Real-time flight tracking
3. **AeroDataBox**: Aircraft and airport data

Replace the mock data in `lib/supabase.js` with real API calls.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Flying with FlightPal! ✈️**
