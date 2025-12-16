import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay
// Note: credentials will be loaded from .env when the function is called
const getRazorpayInstance = () => {
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
};

export const checkout = async (req, res) => {
    try {
        const instance = getRazorpayInstance();

        const options = {
            amount: Number(req.body.amount) * 100, // Amount in lowest denomination (paise)
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`,
        };

        const order = await instance.orders.create(options);

        res.status(200).json({
            success: true,
            order,
            key: process.env.RAZORPAY_KEY_ID // Send key to frontend
        });
    } catch (error) {
        console.error("Razorpay Error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong at payment gateway",
            error: error.message
        });
    }
};

export const paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Payment is verified
            res.status(200).json({
                success: true,
                message: "Payment verified successfully",
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid Signature",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
