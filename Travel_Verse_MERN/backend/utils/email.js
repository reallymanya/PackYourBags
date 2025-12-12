import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});



export const sendVerificationEmail = async (email, token) => {
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