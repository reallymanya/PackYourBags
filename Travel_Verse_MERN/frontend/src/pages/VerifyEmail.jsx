import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying your email...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      try {
        const res = await fetch(`${BASE_URL}/auth/verify-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token })
        });
        
        if (!res.ok) throw new Error("Verification failed");
        
        setMessage("Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        setMessage("Invalid or expired verification link");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;