import Booking from "../models/Booking.js"
import { sendBookingEmail } from '../utils/email.js';

//create new booking
export const createBooking = async (req, res) => {
    // Backend Validation
    const { userId, userEmail, tourName, fullName, phone, guestSize, bookAt } = req.body;

    if (!userId || !userEmail || !tourName || !fullName || !phone || !guestSize || !bookAt) {
        return res.status(400).json({ success: false, message: 'Missing required booking fields' });
    }

    const newBooking = new Booking(req.body)
    try {
        const savedBooking = await newBooking.save()

        // Send confirmation email
        try {
            if (req.body.userEmail) { // Ensure userEmail is present in the request body
                await sendBookingEmail(req.body.userEmail, savedBooking);
            }
        } catch (emailError) {
            console.error("Failed to send booking email:", emailError);
        }

        res.status(200).json({ success: true, message: 'Your tour is booked', data: savedBooking })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const getBooking = async(req,res) => {
    const id =  req.params.id

    try {
        const book =await Booking.findById(id)
        res.status(200).json({success:true, message:"successful" ,data:book})
    } catch (error) {
        res.status(404).json({success: false, message: error})
    }
}



export const getAllBooking = async(req,res) => {
    try {
        const books = await Booking.find({}).sort({ createdAt: -1 })
        res.status(200).json({success:true, message:"successful" ,data:books})
    } catch (error) {
        res.status(500).json({success: false, message: error})
    }
}

export const getUserBookings = async(req,res) => {
    const userId = req.user.id

    try {
        const books = await Booking.find({userId: userId})
        res.status(200).json({success:true, message:"successful" ,data:books})
    } catch (error) {
        res.status(404).json({success: false, message: "not found"})
    }
}