import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, token) => {
  // Create transporter lazily to ensure process.env is loaded
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;


  const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <h2 style="text-align: center; color: #333;">Verify Your Email</h2>
        <p style="color: #555; font-size: 16px;">
          Thank you for signing up! Please confirm your email address by clicking the button below.
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p style="color: #555; font-size: 14px;">
          If you did not sign up for this account, you can ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="text-align: center; color: #888; font-size: 12px;">
          &copy; ${new Date().getFullYear()} Travel_Verse. All rights reserved.
        </p>
      </div>
    `;
  
  await transporter.sendMail({
    from: '"Travel_Verse" <noreply@travelapp.com>',
    to: email,
    subject: 'Verify Your Email',
    html: emailTemplate
  });
};

export const sendPasswordResetEmail = async (email, token) => {
  // Create transporter lazily here as well
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

  const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <h2 style="text-align: center; color: #333;">Reset Your Password</h2>
        <p style="color: #555; font-size: 16px;">
          We received a request to reset your password. Click the button below to proceed.
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetUrl}" 
             style="background-color: #dc3545; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p style="color: #555; font-size: 14px;">
          If you did not request this, please ignore this email. Your password will remain unchanged.
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="text-align: center; color: #888; font-size: 12px;">
          &copy; ${new Date().getFullYear()} Travel_Verse. All rights reserved.
        </p>
      </div>
    `;

  
  await transporter.sendMail({
    from: '"Travel_verse" <noreply@travelverse.com>',
    to: email,
    subject: 'Password Reset Request',
    html: emailTemplate
  });
};

export const sendSubscriptionEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const emailTemplate = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: auto; padding: 0; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #e0f7fa; padding: 40px 20px; text-align: center;">
             <h1 style="color: #0288d1; margin: 0; font-size: 28px;">Welcome to the Family! 🌍</h1>
        </div>
        <div style="padding: 40px 20px; background-color: #fff;">
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Hi there,
            </p>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Thank you for subscribing to the <strong>TravelVerse</strong> newsletter! We're thrilled to have you on board.
            </p>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Get ready for a weekly dose of travel inspiration, exclusive deals, and hidden gems from around the world.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://travel-verse-mern-frontend.onrender.com" style="background-color: #0288d1; color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">
                Start Exploring
              </a>
            </div>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; text-align: center; color: #999; font-size: 12px;">
          &copy; ${new Date().getFullYear()} TravelVerse. All rights reserved.
        </div>
      </div>
    `;

  await transporter.sendMail({
    from: '"TravelVerse" <noreply@travelverse.com>',
    to: email,
    subject: 'Welcome to TravelVerse! ✈️',
    html: emailTemplate
  });
};

export const sendBookingEmail = async (email, bookingDetails) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const { tourName, guestSize, bookAt, _id } = bookingDetails;

  const emailTemplate = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: auto; padding: 0; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #e0f7fa; padding: 40px 20px; text-align: center;">
             <h1 style="color: #00796b; margin: 0; font-size: 28px;">Booking Confirmed! ✅</h1>
        </div>
        <div style="padding: 40px 20px; background-color: #fff;">
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Hello,
            </p>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Great news! Your trip to <strong>${tourName}</strong> is confirmed.
            </p>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0; color: #333;"><strong>Booking ID:</strong> <span style="font-family: monospace; color: #555;">${_id}</span></p>
                <p style="margin: 5px 0; color: #333;"><strong>Tour:</strong> ${tourName}</p>
                <p style="margin: 5px 0; color: #333;"><strong>Date:</strong> ${new Date(bookAt).toLocaleDateString()}</p>
                <p style="margin: 5px 0; color: #333;"><strong>Guests:</strong> ${guestSize}</p>
            </div>

            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              You can view all your bookings in your dashboard.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://travel-verse-mern-frontend.onrender.com/my-bookings" style="background-color: #00796b; color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">
                View My Bookings
              </a>
            </div>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; text-align: center; color: #999; font-size: 12px;">
          &copy; ${new Date().getFullYear()} TravelVerse. All rights reserved.
        </div>
      </div>
    `;

  await transporter.sendMail({
    from: '"TravelVerse" <noreply@travelverse.com>',
    to: email,
    subject: `Booking Confirmed: ${tourName} 🎫`,
    html: emailTemplate
  });
};