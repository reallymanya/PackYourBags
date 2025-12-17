import Subscriber from "../models/Subscriber.js";
import { sendSubscriptionEmail } from "../utils/email.js";

export const subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        message: "You are already subscribed!",
      });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Send welcome email
    try {
        await sendSubscriptionEmail(email);
    } catch (emailError) {
        console.error("Failed to send subscription email:", emailError);
        // Continue without failing the request
    }

    res.status(200).json({
      success: true,
      message: "Successfully subscribed to the newsletter!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to subscribe. Please try again.",
    });
  }
};
