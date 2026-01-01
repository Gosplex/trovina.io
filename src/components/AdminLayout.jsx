import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, LogOut, FolderKanban } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function AdminLayout({ children }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/admin/login");
    };

    return (
        <div className="h-screen bg-[#0f0f0f] text-white">
            {/* SIDEBAR (FIXED) */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-gray-800 flex flex-col">
                {/* Brand */}
                <div className="px-6 py-5 border-b border-gray-800">
                    <h1 className="text-xl font-bold">Trovina Admin</h1>
                    <p className="text-xs text-gray-400 mt-1">Internal Dashboard</p>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
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

                    <NavLink
                        to="/admin/projects"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
                            ${isActive ? "bg-gray-800" : "hover:bg-gray-900"}`
                        }
                    >
                        <FolderKanban size={18} />
                        Projects
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

            {/* MAIN CONTENT (SCROLLS) */}
            <main className="ml-64 h-screen overflow-y-auto p-6">
                {children}
            </main>
        </div>
    );
}
