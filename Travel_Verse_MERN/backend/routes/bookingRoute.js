import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { createBooking, getBooking, getAllBooking, getUserBookings } from '../controllers/bookingController.js';


const router = express.Router();

router.post('/', verifyUser , createBooking)
router.get('/user/all', verifyUser, getUserBookings)
router.get('/:id', verifyUser , getBooking)
router.get('/', verifyAdmin , getAllBooking)



export default router;