import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import Lottie from "react-lottie";
import emailAnimation from "../assets/animation/email-sent.json";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const defaultAnimationOptions = {
    loop: true,
    autoplay: true, 
    animationData: emailAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || loading) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!res.ok) throw new Error("Failed to send reset email");
      
      setMessage("Password reset instructions sent to your email");
      setEmailSent(true);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-xl">
        {emailSent ? (
          <div className="text-center space-y-4">
            <div className="mx-auto w-48 h-48">
              <Lottie options={defaultAnimationOptions} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Check Your Inbox
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We've sent password reset instructions to<br/>{email}
            </p>
            <button
              onClick={() => setEmailSent(false)}
              className="mt-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Resend Email
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Forgot Password?
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your email to reset your password
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-gray-100"
                autoFocus
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          </>
        )}

        {message && (
          <p className={`mt-4 text-center text-sm ${
            message.includes("sent") ? 
            "text-green-600 dark:text-green-400" : 
            "text-red-500 dark:text-red-400"
          }`}>
            {message}
          </p>
        )}

        <div className="mt-6 text-center">
          <Link 
            to="/login" 
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;