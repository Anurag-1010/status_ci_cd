import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex-1 flex flex-col">
        
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}