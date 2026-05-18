import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from '../assests/logo.png.jpeg'
import API from "../api";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // 🔥 Email localStorage se
  const email = localStorage.getItem("email");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email not found. Please try again.");
      navigate("/");
      return;
    }

    try {
      const res = await API.post(
        "/auth/verify-otp",
        { email, otp }  
      );
     console.log("res",res)
    //   alert(res.data.message);

      if (res.status===200) {

        localStorage.setItem("token", res.data.token); 
        // agar token bhej raha hai backend
      window.location.href = "/dashboard";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white w-[350px] p-8 rounded-2xl shadow-lg text-center">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 object-contain"
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Verify OTP
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Enter the OTP sent to your email
        </p>

        <form onSubmit={handleVerify} className="space-y-4">

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition"
          >
            Verify OTP
          </button>

        </form>

      </div>
    </div>
  );
};

export default OtpPage;