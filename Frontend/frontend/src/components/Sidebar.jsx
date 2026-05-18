import logo from "../assests/Keyss_iamge.png";
import {
    LayoutDashboard,
    ClipboardList,
    CalendarDays,
    FileText,
    ShieldCheck
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="hidden md:flex flex-col w-64 bg-white shadow-sm px-6 py-6">

            <div className="mb-10">
                <img src={logo} alt="logo" className="h-12 object-contain" />
            </div>

            <nav className="flex flex-col gap-6 text-gray-600">

                <SidebarItem
                    to="/dashboard"
                    icon={<LayoutDashboard size={18} />}
                    label="Dashboard"
                />

                <SidebarItem
                    to="/status"
                    icon={<ClipboardList size={18} />}
                    label="Status"
                />

                {/* Static Leaves */}
                <div className="flex items-center gap-3  font-semibold mt-2">
                    <CalendarDays size={18} />
                    <span>Leaves</span>
                </div>

                {/* Nested Attendance */}
                <div className="ml-8">
                    <SidebarItem
                        to="/attendance"
                        icon={<FileText size={16} />}
                        label="Attendance"
                    />
                </div>

                <SidebarItem
                    to="/company-policy"
                    icon={<ShieldCheck size={18} />}
                    label="Company Policy"
                />

            </nav>
        </div>
    );
}

function SidebarItem({ to, icon, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 cursor-pointer 
         ${isActive ? "text-orange-500 font-semibold" : "hover:text-orange-500"}`
            }
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
}