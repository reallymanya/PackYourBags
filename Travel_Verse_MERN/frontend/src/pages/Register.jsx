import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from "react-lottie";
import registerAnimation from "../assets/animation/Register.json"; // Add your animation file
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const defaultAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: registerAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();

      if (!res.ok) {
        setError(result.message);
        setLoading(false);
        return;
      }

      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-full max-w-4xl mx-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Animation Section */}
        <div className="w-full lg:w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600">
          <div className="w-64 h-64">
            <Lottie options={defaultAnimationOptions} />
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8  dark:bg-gray-800">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Create an Account
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Join us to get started
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleClick} className="space-y-4">
            <div>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-gray-100"
                required
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-gray-100"
                required
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-gray-100"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
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
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                Login
              </Link>
            </p>
          </div>

          {/* Google Login Button */}
        {process.env.REACT_APP_GOOGLE_CLIENT_ID ? (
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <div className="mb-4">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    setLoading(true);
                    setError(null);
                    
                    const res = await fetch(`${BASE_URL}/auth/google`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      credentials: "include",
                      body: JSON.stringify({ token: credentialResponse.credential }),
                    });

                    const data = await res.json();
                    if (data.success) {
                      dispatch({ type: "LOGIN_SUCCESS", payload: data.data });
                      navigate("/");
                    } else {
                      setError(data.message || "Google login failed");
                      setLoading(false);
                    }
                  } catch (err) {
                    console.error("Google login failed:", err);
                    setError("Google login failed. Please try again.");
                    setLoading(false);
                  }
                }}
                onError={(error) => {
                  console.error("Google login error:", error);
                  setError("Google authentication failed. Please try again.");
                }}
                useOneTap
              />
            </div>
          </GoogleOAuthProvider>
        ) : (
          <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
            Google authentication is not configured. Please set REACT_APP_GOOGLE_CLIENT_ID in your .env file.
          </div>
        )} 
        </div>
      </div>
    </div>
  );
};

export default Register;