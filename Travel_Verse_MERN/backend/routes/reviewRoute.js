import express from 'express';
import { createReview, deleteReview } from '../controllers/reviewController.js';
import { verifyUser } from '../utils/verifyToken.js';


const router = express.Router();

router.post('/:tourId', verifyUser ,createReview)
router.delete('/:id', verifyUser, deleteReview);

export default router;