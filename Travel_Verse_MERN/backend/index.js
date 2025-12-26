import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { mongoDBconnect } from "./config/mongoDBConn.js";
import tourRoute from './routes/tourRoute.js'
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'
import reviewRoute from './routes/reviewRoute.js'
import bookingRoute from './routes/bookingRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import subscribeRoute from './routes/subscribeRoute.js'
import itineraryRoute from './routes/itineraryRoute.js'

//
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Derive __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



dotenv.config();
const app = express();
const port = process.env.PORT || 5001


//middleware
app.use(express.json())
// #region agent log
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Email Config Check - User:', process.env.EMAIL_USER ? 'Set' : 'Missing');
console.log('Email Config Check - Pass:', process.env.EMAIL_PASS ? 'Set' : 'Missing');
console.log('CORS origin will allow:', process.env.NODE_ENV === 'development' || !process.env.NODE_ENV ? ['http://localhost:3000', 'https://travel-verse-mern-frontend.onrender.com'] : 'https://travel-verse-mern-frontend.onrender.com');
// #endregion
// app.use(cors(corsOptions));
// Simplified CORS for development - allow all origins
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  // #region agent log
  console.log('CORS: Allowing all origins in development mode');
  // #endregion
  app.use(cors({
    origin: true, // Allow all origins in development
    credentials: true,
  }));
} else {
  app.use(cors({
    origin: 'https://travel-verse-mern-frontend.onrender.com',
    credentials: true,
  }));
}

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// #region agent log
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.headers.origin || 'none'}`);
  next();
});
// #endregion
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/tours', tourRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/booking', bookingRoute)
app.use('/api/v1/payment', paymentRoute)
app.use('/api/v1/subscribe', subscribeRoute)
app.use('/api/v1/itinerary', itineraryRoute)
//
// Serve static files
app.use(express.static(join(__dirname, '../frontend/build'))); // Adjust the path as needed

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../frontend/build', 'index.html')); // Adjust the path as needed
});


app.listen(port, () => {
    mongoDBconnect();
    console.log(`${port} is running`)
})

