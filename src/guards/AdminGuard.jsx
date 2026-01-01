import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";

export default function AdminGuard({ children }) {
    const { user, loading } = useAuth();
    const toastShownRef = useRef(false);

    // 🔔 Toast only once
    useEffect(() => {
        if (!loading && !user && !toastShownRef.current) {
            toast.error("Please log in to access the admin panel");
            toastShownRef.current = true;
        }
    }, [loading, user]);

    // 🔄 Wait silently (no flash)
    if (loading) {
        return null;
    }

    // ❌ Not logged in
    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    // ✅ Logged in
    return children;
}
