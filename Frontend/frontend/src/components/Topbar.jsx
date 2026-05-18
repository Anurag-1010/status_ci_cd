import { Bell, Moon, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import {useNavigate } from "react-router-dom";

export default function Topbar() {
  const [open, setOpen] = useState(false);
     const navigate = useNavigate();

    const handleLogout = () => {
    // Remove stored data
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    // Redirect to login
    navigate("/");
  };


  return (
    <div className="flex justify-between items-center bg-[#f5f1ed] px-6 py-4">

      {/* Mobile toggle */}
      <Menu className="md:hidden cursor-pointer" />

      <div className="flex items-center gap-6 ml-auto">

        <Moon size={20} className="cursor-pointer" />
        <Bell size={20} className="cursor-pointer" />

        {/* Profile */}
        <div
          className="flex items-center gap-3 cursor-pointer relative"
          onClick={() => setOpen(!open)}
        >
          <div className="w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center">
            AS
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium">Anurag Sharma</p>
            <p className="text-xs text-gray-500">employee</p>
          </div>

          <ChevronDown size={16} />

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-12 bg-white shadow-md rounded-md w-40 p-2">
              <p className="p-2 hover:bg-gray-100 cursor-pointer">Profile</p>
              <p className="p-2 hover:bg-gray-100 cursor-pointer"  onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}