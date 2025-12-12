import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    
    password: {
      type: String,
      required: true // Only required for local auth,
    },

    role: {
      type: String,
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    authMethod: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    avatar: String,

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);