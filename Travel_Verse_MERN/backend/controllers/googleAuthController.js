import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { randomBytes } from "crypto"

export const googleAuth = async (req, res) => {
  try {
    // Check if Google Client ID is configured
    if (!process.env.GOOGLE_CLIENT_ID) {
      return res.status(500).json({
        success: false,
        message: 'Google authentication is not configured. Please set GOOGLE_CLIENT_ID in environment variables.'
      });
    }

    const { token: googleToken } = req.body;
    
    if (!googleToken) {
      return res.status(400).json({
        success: false,
        message: 'Google token is required'
      });
    }
    
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;
    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        username: name,
        email,
        password: randomBytes(10).toString('hex'), // Random password for Google users
        isVerified: true,
        avatar: picture,
        authMethod: 'google'
      });
      await user.save();
    } else {
      // Update existing user if they're logging in with Google
      if (user.authMethod !== 'google') {
        // If user was created with local auth, update to allow Google auth
        user.authMethod = 'google';
        user.avatar = picture || user.avatar;
        await user.save();
      } else {
        // Update avatar if changed
        if (picture && user.avatar !== picture) {
          user.avatar = picture;
          await user.save();
        }
      }
    }

    // Generate JWT token
    const jwtToken = jwt.sign( // Rename to avoid conflict
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    const {password, ...rest} = user._doc;

    res.cookie('accessToken', jwtToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      credentials: true
    }).status(200).json({
      success: true,
      message: 'Google login successful',
      token: jwtToken,
      role: user.role,
      data: { ...rest }
    });

  } catch (error) {
    console.error('Google authentication error:', error);
    
    // Handle specific Google auth errors
    if (error.message && error.message.includes('Token used too early')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Google token. Please try again.'
      });
    }
    
    if (error.message && error.message.includes('Invalid token signature')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Google token. Please sign in again.'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Google authentication failed. Please try again.'
    });
  }
};