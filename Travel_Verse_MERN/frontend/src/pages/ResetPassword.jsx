import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import Lottie from "react-lottie";
import resetAnimation from "../assets/animation/reset-password.json"; // Add your animation file

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const defaultAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: resetAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    const token = searchParams.get("token");

    try {
      const res = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Server Response:", result); // Log the server response
        throw new Error(result.message || "Password reset failed");
      }

      setMessage("Password updated successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setMessage(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-full max-w-md p-6 dark:bg-gray-800 rounded-xl shadow-lg">
        {/* Animation Section */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32">
            <Lottie options={defaultAnimationOptions} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
          Reset Password
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              message.includes("successfully")
                ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200"
                : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-gray-100"
              required
            />
            <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  passwordStrength === 0
                    ? "bg-red-500"
                    : passwordStrength <= 2
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${(passwordStrength / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-gray-100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || passwordStrength < 2 || password !== confirmPassword}
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;