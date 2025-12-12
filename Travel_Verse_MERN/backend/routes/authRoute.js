import express from "express";
import { forgotPassword, login, register, resetPassword, verifyEmail } from "../controllers/authController.js";
import { googleAuth } from "../controllers/googleAuthController.js";
const router = express.Router();

const validateResetPassword = (req, res, next) => {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required'
      });
    }
  
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }
  
    next();
  };

router.post('/register', register)
router.post('/login', login)
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', validateResetPassword, resetPassword);
router.post('/google', googleAuth);

export default router;