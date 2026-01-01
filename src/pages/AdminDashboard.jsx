import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    getDoc,
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
import { LEAD_STATUS } from "../constants/lead.constants";
import { capitalize } from "../utils/text";
import { PROJECT_STATUS, PAYMENT_STATUS, PAYMENT_PLAN, CURRENCY } from "../constants/projectConstants";

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [rates, setRates] = useState({ ngnToUsd: 0, ngnToInr: 0 });
    const [totalEarningsUSD, setTotalEarningsUSD] = useState(0);

    const [stats, setStats] = useState({
        total: 0,
        new: 0,
        contacted: 0,
        qualified: 0,
        converted: 0,
    });

    const [recentLeads, setRecentLeads] = useState([]);
    const [weeklyData, setWeeklyData] = useState([]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // Fetch exchange rates
            const configSnap = await getDoc(doc(db, "config", "exchangeRates"));
            const exchangeRates = configSnap.exists() ? configSnap.data() : { ngnToUsd: 0.000692, ngnToInr: 0.0622 };
            setRates(exchangeRates);

            // Fetch leads
            const leadsSnap = await getDocs(collection(db, "leads"));
            const leads = [];

            for (const d of leadsSnap.docs) {
                const data = d.data();

                if (!data.leadStatus) {
                    await updateDoc(doc(db, "leads", d.id), {
                        leadStatus: LEAD_STATUS.NEW,
                        updatedAt: serverTimestamp(),
                    });
                    data.leadStatus = LEAD_STATUS.NEW;
                }

                leads.push({
                    id: d.id,
                    businessName: data.businessName || data.fullName,
                    fullName: data.fullName || "—",
                    email: data.emailAddress || "—",
                    phone: data.phoneNumber || "—",
                    country: data.country || "—",
                    status: data.leadStatus,
                    createdAt: data.createdAt,
                });
            }

            leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            const total = leads.length;
            const newLeads = leads.filter(l => l.status === LEAD_STATUS.NEW).length;
            const contacted = leads.filter(l => l.status === LEAD_STATUS.CONTACTED).length;
            const qualified = leads.filter(l => l.status === LEAD_STATUS.QUALIFIED).length;
            const converted = leads.filter(l => l.status === LEAD_STATUS.CONVERTED).length;

            setStats({
                total,
                new: newLeads,
                contacted,
                qualified,
                converted,
            });

            setRecentLeads(leads.slice(0, 5));

            const weekMap = {};
            leads.forEach(l => {
                const day = new Date(l.createdAt).toLocaleDateString("en-US", {
                    weekday: "short",
                });
                weekMap[day] = (weekMap[day] || 0) + 1;
            });

            setWeeklyData(
                Object.entries(weekMap).map(([day, leads]) => ({
                    day,
                    leads,
                }))
            );


            const projectsSnap = await getDocs(collection(db, "projects"));
            let totalUSD = 0;

            for (const d of projectsSnap.docs) {
                const data = d.data();

                const amountPaid = Number(data.amountPaid) || 0;
                const currency = data.currency || CURRENCY.NGN;
                const paymentStatus = data.paymentStatus || PAYMENT_STATUS.PENDING;

                if (amountPaid <= 0) continue;

                const isPaidOrPartial =
                    paymentStatus === PAYMENT_STATUS.PAID ||
                    paymentStatus === PAYMENT_STATUS.PARTIALLY_PAID;

                if (!isPaidOrPartial && amountPaid > 0) {
                    // You can choose to include anyway if amountPaid exists
                    // Or skip if status doesn't reflect payment
                    // Here we INCLUDE it because money was received
                }

                let amountInUSD = 0;

                if (currency === CURRENCY.USD) {
                    amountInUSD = amountPaid;
                } else if (currency === CURRENCY.NGN) {
                    amountInUSD = amountPaid * (rates.ngnToUsd || 0.000692); // fallback if rate missing
                } else if (currency === CURRENCY.INR) {
                    // Convert INR → NGN → USD using the known NGN rates
                    const inrToUsd = rates.ngnToUsd / rates.ngnToInr;
                    amountInUSD = amountPaid * (inrToUsd || 0); // fallback to 0 if rates missing
                }
                // Add more currencies here if needed in future

                totalUSD += amountInUSD;
            }

            setTotalEarningsUSD(totalUSD);
        } catch (err) {
            console.error("Dashboard fetch failed:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <AdminLayout>
            <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-4xl font-bold">Dashboard</h1>

                {/* STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading ? (
                        Array(5).fill(0).map((_, i) => <SkeletonCard key={i} />)
                    ) : (
                        <>
                            <StatCard icon={<Users />} title="Total Leads" value={stats.total} />
                            <StatCard icon={<Zap />} title="New" value={stats.new} />
                            <StatCard icon={<MessageSquare />} title="Contacted" value={stats.contacted} />
                            <StatCard icon={<CheckCircle />} title="Qualified" value={stats.qualified} />
                            <EarningsCard totalUSD={totalEarningsUSD} rates={rates} />
                        </>
                    )}
                </div>

                {!loading && stats.new > 0 && (
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 flex items-center gap-4">
                        <TrendingUp className="text-purple-400" />
                        <p className="text-purple-300 font-semibold">
                            {stats.new} new leads need follow-up
                        </p>
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* RECENT LEADS */}
                    <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-6">Recent Leads</h3>

                        {loading ? (
                            <TableSkeleton />
                        ) : (
                            <table className="w-full text-sm">
                                <tbody>
                                    {recentLeads.map((l) => (
                                        <tr key={l.id} className="border-b border-gray-800">
                                            <td className="py-4 font-medium">{l.businessName}</td>
                                            <td className="py-4">
                                                {l.fullName}
                                                <div className="text-xs text-gray-500">{l.email}</div>
                                            </td>
                                            <td className="py-4">
                                                <StatusBadge status={l.status} />
                                            </td>
                                            <td className="py-4 text-gray-400 flex items-center gap-2">
                                                <Clock size={14} />
                                                {formatDate(new Date(l.createdAt))}
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
   UI HELPERS
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
    return <div className="h-[240px] bg-gray-800 rounded-xl animate-pulse" />;
}

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

function EarningsCard({ totalUSD, rates }) {
    const [selectedCurrency, setSelectedCurrency] = useState(CURRENCY.USD);

    const currencySymbols = {
        [CURRENCY.USD]: '$',
        [CURRENCY.NGN]: '₦',
        [CURRENCY.INR]: '₹',
    };

    let displayed = 0;
    if (selectedCurrency === CURRENCY.USD) {
        displayed = totalUSD;
    } else if (selectedCurrency === CURRENCY.NGN) {
        displayed = totalUSD / rates.ngnToUsd;
    } else if (selectedCurrency === CURRENCY.INR) {
        displayed = totalUSD / (rates.ngnToUsd / rates.ngnToInr);
    }

    const formatted = (currencySymbols[selectedCurrency] || '') + displayed.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-2">Total Earnings</p>
            <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">{formatted}</p>
                <div className="text-gray-400"><DollarSign /></div>
            </div>
            <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="mt-4 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-sm focus:outline-none focus:border-purple-500/50 transition"
            >
                {Object.values(CURRENCY).map((curr) => (
                    <option key={curr} value={curr}>
                        {curr}
                    </option>
                ))}
            </select>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        new: "bg-purple-500/20 text-purple-400",
        contacted: "bg-blue-500/20 text-blue-400",
        qualified: "bg-yellow-500/20 text-yellow-400",
        converted: "bg-green-500/20 text-green-400",
        lost: "bg-red-500/20 text-red-400",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs ${styles[status] || ""}`}>
            {capitalize(status)}
        </span>
    );
}