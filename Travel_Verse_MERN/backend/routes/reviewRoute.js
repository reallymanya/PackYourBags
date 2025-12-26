import express from 'express';
import { createReview, deleteReview, getAllReviews } from '../controllers/reviewController.js';
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';


const router = express.Router();

router.post('/:tourId', verifyUser ,createReview)
router.delete('/:id', verifyUser, deleteReview);
router.get('/all', verifyAdmin, getAllReviews);

export default router;