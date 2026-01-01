import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function AdminLayout({ children }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen flex bg-[#0f0f0f] text-white">
            {/* SIDEBAR */}
            <aside className="w-64 bg-black border-r border-gray-800 flex flex-col">
                {/* Brand */}
                <div className="px-6 py-5 border-b border-gray-800">
                    <h1 className="text-xl font-bold">Trovina Admin</h1>
                    <p className="text-xs text-gray-400 mt-1">Internal Dashboard</p>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <NavLink
                        to="/admin/dashboard"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
              ${isActive ? "bg-gray-800" : "hover:bg-gray-900"}`
                        }
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/leads"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
              ${isActive ? "bg-gray-800" : "hover:bg-gray-900"}`
                        }
                    >
                        <Users size={18} />
                        Leads
                    </NavLink>
                </nav>

                {/* Logout */}
                <div className="px-4 py-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm bg-gray-900 hover:bg-gray-800 transition"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
