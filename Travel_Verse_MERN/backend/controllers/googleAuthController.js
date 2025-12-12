import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { randomBytes } from "crypto"

export const googleAuth = async (req, res) => {
  try {
    const { token: googleToken } = req.body; // Rename the token to avoid conflict
    
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
        password: randomBytes(10).toString('hex'), // Random password
        isVerified: true,
        avatar: picture,
        authMethod: 'google'
      });
      await user.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign( // Rename to avoid conflict
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    res.cookie('accessToken', jwtToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
    }).status(200).json({
      success: true,
      message: 'Google login successful',
      token: jwtToken,
      role: user.role,
      data: { ...user._doc }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Google authentication failed' });
   
  }
};