import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import logo from '../assests/logo.png.jpeg'

export default function EmailPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/verify");
    await API.post("/auth/send-otp", { email });
    localStorage.setItem("email", email);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-[400px] p-8 rounded-2xl shadow-lg text-center">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="w-20 h-20" />
        </div>

        <h1 className="text-2xl font-semibold tracking-widest text-gray-700">
          <span className="text-orange-500">KEY</span>SS
        </h1>

        <h2 className="mt-3 text-lg font-medium text-gray-800">
          Sign In to KEYSS
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Enter your email to receive OTP
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}