import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import {
    Users,
    Zap,
    MessageSquare,
    CheckCircle,
    DollarSign,
    TrendingUp,
    Calendar,
    Clock,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import AdminLayout from "../components/AdminLayout";
import { db } from "../lib/firebase";
import { formatDate } from "../utils/date";



/* ===============================
   MAIN DASHBOARD
================================ */

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        total: 0,
        new: 0,
        contacted: 0,
        completed: 0,
        earnings: 0,
    });

    const [recentLeads, setRecentLeads] = useState([]);
    const [weeklyData, setWeeklyData] = useState([]);

    /* ===============================
       FETCH + NORMALIZE DATA
    ================================ */
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const allLeads = [];

            // -------- LEADS ----------
            const leadsSnap = await getDocs(collection(db, "leads"));
            for (const d of leadsSnap.docs) {
                const data = d.data();

                if (!data.status) {
                    await updateDoc(doc(db, "leads", d.id), {
                        status: "new",
                        updatedAt: serverTimestamp(),
                    });
                    data.status = "new";
                }

                allLeads.push({
                    id: d.id,
                    business: data.businessName || "—",
                    name: data.name || data.fullName,
                    email: data.email,
                    phone: data.phone,
                    country: data.country,
                    status: data.status,
                    createdAt: data.createdAt,
                });
            }

            // -------- FREE WEBSITE PROMO ----------
            const promoSnap = await getDocs(collection(db, "free_website_promo"));
            for (const d of promoSnap.docs) {
                const data = d.data();

                if (!data.status) {
                    await updateDoc(doc(db, "free_website_promo", d.id), {
                        status: "new",
                        updatedAt: serverTimestamp(),
                    });
                    data.status = "new";
                }

                allLeads.push({
                    id: d.id,
                    business: data.businessName,
                    name: data.fullName,
                    email: data.email,
                    phone: data.phone,
                    country: data.country,
                    status: data.status,
                    createdAt: data.createdAt,
                });
            }

            // SORT
            allLeads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            const total = allLeads.length;
            const newLeads = allLeads.filter(l => l.status === "new").length;
            const contacted = allLeads.filter(l => l.status === "contacted").length;
            const completed = allLeads.filter(l => l.status === "completed").length;

            setStats({
                total,
                new: newLeads,
                contacted,
                completed,
                earnings: completed * 90000,
            });

            setRecentLeads(allLeads.slice(0, 5));

            const weekMap = {};
            allLeads.forEach(l => {
                const day = new Date(l.createdAt).toLocaleDateString("en-US", {
                    weekday: "short",
                });
                weekMap[day] = (weekMap[day] || 0) + 1;
            });

            setWeeklyData(
                Object.entries(weekMap).map(([day, leads]) => ({ day, leads }))
            );
        } catch (err) {
            console.error("Dashboard fetch failed:", err);
        } finally {
            setLoading(false);
        }
    };

    /* ===============================
       INIT
    ================================ */
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const formatCurrency = value =>
        new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
        }).format(value);

    /* ===============================
       RENDER
    ================================ */
    return (
        <AdminLayout>
            <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-4xl font-bold">Dashboard</h1>

                {/* STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {(loading ? Array(5).fill(0) : [1]).map((_, i) =>
                        loading ? (
                            <SkeletonCard key={i} />
                        ) : (
                            <>
                                <StatCard icon={<Users />} title="Total Leads" value={stats.total} />
                                <StatCard icon={<Zap />} title="New Leads" value={stats.new} />
                                <StatCard icon={<MessageSquare />} title="Contacted" value={stats.contacted} />
                                <StatCard icon={<CheckCircle />} title="Completed" value={stats.completed} />
                                <StatCard icon={<DollarSign />} title="Money Earned" value={formatCurrency(stats.earnings)} />
                            </>
                        )
                    )}
                </div>

                {/* ALERT */}
                {!loading && stats.new > 0 && (
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 flex items-center gap-4">
                        <TrendingUp className="text-purple-400" />
                        <p className="text-purple-300 font-semibold">
                            {stats.new} new leads are waiting to be contacted
                        </p>
                    </div>
                )}

                {/* MAIN GRID */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* RECENT LEADS */}
                    <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-6">Recent Leads</h3>

                        {loading ? (
                            <TableSkeleton />
                        ) : (
                            <table className="w-full text-sm">
                                <tbody>
                                    {recentLeads.map((l, i) => (
                                        <tr key={i} className="border-b border-gray-800">
                                            <td className="py-4 font-medium">{l.business}</td>
                                            <td className="py-4">
                                                {l.name}
                                                <div className="text-xs text-gray-500">{l.email}</div>
                                            </td>
                                            <td className="py-4">
                                                <StatusBadge status={l.status} />
                                            </td>
                                            <td className="py-4 text-gray-400 flex items-center gap-2">
                                                <Clock size={14} />
                                                {formatDate(new Date(l.createdAt).toLocaleString())}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* CHART */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Calendar size={18} /> Leads This Week
                        </h3>

                        {loading ? (
                            <ChartSkeleton />
                        ) : (
                            <ResponsiveContainer width="100%" height={240}>
                                <BarChart data={weeklyData}>
                                    <CartesianGrid stroke="#374151" />
                                    <XAxis dataKey="day" stroke="#9CA3AF" />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip />
                                    <Bar dataKey="leads" fill="#a78bfa" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </motion.div>
        </AdminLayout>
    );
}

/* ===============================
   SKELETONS
================================ */

function SkeletonCard() {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-4" />
            <div className="h-8 bg-gray-700 rounded w-3/4" />
        </div>
    );
}

function TableSkeleton() {
    return (
        <div className="space-y-4 animate-pulse">
            {Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-6 bg-gray-700 rounded" />
            ))}
        </div>
    );
}

function ChartSkeleton() {
    return (
        <div className="h-[240px] bg-gray-800 rounded-xl animate-pulse" />
    );
}

/* ===============================
   UI COMPONENTS
================================ */

function StatCard({ icon, title, value }) {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-2">{title}</p>
            <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">{value}</p>
                <div className="text-gray-400">{icon}</div>
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        new: "bg-purple-500/20 text-purple-400",
        contacted: "bg-blue-500/20 text-blue-400",
        completed: "bg-green-500/20 text-green-400",
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs ${styles[status]}`}>
            {status}
        </span>
    );
}
