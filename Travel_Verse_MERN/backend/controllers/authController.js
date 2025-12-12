import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/email.js';

export const register = async(req,res) => {
    try {

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

//
        const verificationToken = crypto.randomBytes(20).toString('hex');
        const verificationTokenExpires = Date.now() + 3600000;
//


        const newUser = new User({
            username : req.body.username,
            email: req.body.email,
            password:hash,
            //
            isVerified: false,
            verificationToken,
            verificationTokenExpires
            //

        })

        await newUser.save()

        //
        await sendVerificationEmail(newUser.email, verificationToken);
        
        //

        res.status(200).json({success:true, message: 'Registration successful. Please check your email for verification.'})

        
    } catch (error) {
        res.status(500).json({success:false, message: 'failed to created'})
        
        
    }
}
export const login = async(req,res) => {

    const email = req.body.email
    try {

        const user = await User.findOne({email}) 

        if(!user){
            return res.status(404).json({success:false, message:"user not found"})
        }

        // 
        if (!user.isVerified) {
            return res.status(401).json({ 
                success: false, 
                message: 'Email not verified. Check your email for verification link.' 
            });
        }
        //

        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)

        if (!checkCorrectPassword)
        {
            return res.status(401).json({success:false, message: 'Incorrect Email or Password'})
        }
            
            
            const {password, role, ...rest} = user._doc;

        const token = jwt.sign({id: user._id, role:user.role},
             process.env.JWT_SECRET_KEY,
            {expiresIn : "15d"} );

            res.cookie('accessToken', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
            }).status(200).json({success:true, message: 'successfully Login', token, role,
                data: {...rest},
            })
        
    } catch (err) {

        res.status(500).json({success:false, message: 'Login Failed' })
        
        
    }
}


export const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({
            verificationToken: req.body.token,
            verificationTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Email verified successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Verification failed' });
        
    }
};

// New Password Reset Controllers
export const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send reset email
        await sendPasswordResetEmail(user.email, resetToken);

        res.status(200).json({ 
            success: true, 
            message: 'Password reset instructions sent to your email' 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Password reset failed' });
       
    }
};

export const resetPassword = async (req, res) => {
    try {

    
        
        const user = await User.findOne({
            resetPasswordToken: req.body.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        if (!req.body.newPassword) {
            return res.status(400).json({ 
              success: false, 
              message: 'New password is required' 
            });
          }

        // Update password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.newPassword, salt);
user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Password updated successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Password reset failed' });
    
    }
};