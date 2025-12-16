import express from "express";
import { checkout, paymentVerification } from "../controllers/paymentController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Route to create an order
router.post("/checkout", verifyUser, checkout);

// Route to verify payment signature
router.post("/paymentverification", verifyUser, paymentVerification);

export default router;
