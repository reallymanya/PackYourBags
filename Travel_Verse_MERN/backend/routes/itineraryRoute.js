import express from 'express';
import {
  createItinerary,
  getUserItineraries,
  getItinerary,
  updateItinerary,
  deleteItinerary,
} from '../controllers/itineraryController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// Create itinerary
router.post('/', verifyUser, createItinerary);

// Get user's itineraries
router.get('/user/all', verifyUser, getUserItineraries);

// Get single itinerary
router.get('/:id', verifyUser, getItinerary);

// Update itinerary
router.put('/:id', verifyUser, updateItinerary);

// Delete itinerary
router.delete('/:id', verifyUser, deleteItinerary);

export default router;

