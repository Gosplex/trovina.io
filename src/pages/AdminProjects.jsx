import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/date";
import { capitalize } from "../utils/text";

import {
    Eye,
    Pencil,
    Plus,
    Search,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import AdminLayout from "../components/AdminLayout";
import { db } from "../lib/firebase";

import {
    PROJECT_STATUS,
    CURRENCY,
} from "../constants/projectConstants";

/* ===================================================== */

export default function AdminProjects() {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rates, setRates] = useState({ ngnToUsd: 0.000692, ngnToInr: 0.0622 });

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCurrency, setSelectedCurrency] = useState(CURRENCY.NGN); // Default to NGN

    const projectsPerPage = 10;

    /* ================= FETCH DATA ================= */

    const fetchProjects = async () => {
        try {
            setLoading(true);

            // Fetch exchange rates from config
            const configDoc = await getDoc(doc(db, "config", "exchangeRates"));
            if (configDoc.exists()) {
                const data = configDoc.data();
                setRates({
                    ngnToUsd: data.ngnToUsd || 0.000692,
                    ngnToInr: data.ngnToInr || 0.0622,
                });
            }

            const rows = [];
            const snap = await getDocs(collection(db, "projects"));

            for (const d of snap.docs) {
                const data = d.data();

                rows.push({
                    id: d.id,
                    title: data.projectTitle || "—",
                    owner: data.projectOwnerSnapshot?.fullName || "—",
                    status: data.projectStatus || PROJECT_STATUS.PENDING,
                    totalPrice: Number(data.totalPrice) || 0,
                    amountPaid: Number(data.amountPaid) || 0,
                    currency: data.currency || CURRENCY.NGN,
                    createdAt: data.createdAt,
                });
            }

            rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setProjects(rows);
        } catch (err) {
            console.error("Failed to fetch projects:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    /* ================= CURRENCY CONVERSION HELPERS ================= */

    const convertToTargetCurrency = (amount, fromCurrency) => {
        if (fromCurrency === selectedCurrency) return amount;

        let amountInNGN = 0;

        // First convert to NGN (central currency)
        if (fromCurrency === CURRENCY.USD) {
            amountInNGN = amount / rates.ngnToUsd;
        } else if (fromCurrency === CURRENCY.INR) {
            amountInNGN = amount / rates.ngnToInr;
        } else if (fromCurrency === CURRENCY.NGN) {
            amountInNGN = amount;
        }

        // Then convert from NGN to target currency
        if (selectedCurrency === CURRENCY.USD) {
            return amountInNGN * rates.ngnToUsd;
        } else if (selectedCurrency === CURRENCY.INR) {
            return amountInNGN * rates.ngnToInr;
        } else {
            return amountInNGN; // NGN
        }
    };

    const formatAmount = (amount) => {
        return amount.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });
    };

    const getCurrencySymbol = () => {
        switch (selectedCurrency) {
            case CURRENCY.NGN: return "₦";
            case CURRENCY.USD: return "$";
            case CURRENCY.INR: return "₹";
            default: return "";
        }
    };

    /* ================= FILTER + PAGINATION ================= */

    const filtered = projects.filter((p) => {
        const matchesSearch =
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.owner.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || p.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filtered.length / projectsPerPage);

    const paginated = filtered.slice(
        (currentPage - 1) * projectsPerPage,
        currentPage * projectsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    /* ================= RENDER ================= */

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-white">Projects</h1>
                        <p className="text-gray-400 mt-1">
                            Manage all client projects
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/admin/projects/new")}
                        className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                    >
                        <Plus size={18} />
                        New Project
                    </button>
                </div>

                {/* Search + Filter + Currency Selector */}
                <div className="flex flex-col sm:flex-row items-stretch gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Search project or owner..."
                            className="w-full h-[56px] pl-12 pr-5 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500/50"
                        />
                    </div>

                    {/* Status */}
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="h-[56px] px-5 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500/50"
                    >
                        <option value="all">All Status</option>
                        {Object.values(PROJECT_STATUS).map((s) => (
                            <option key={s} value={s}>
                                {capitalize(s.replace("_", " "))}
                            </option>
                        ))}
                    </select>

                    {/* Currency */}
                    <select
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        className="h-[56px] sm:w-48 px-5 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500/50"
                    >
                        <option value={CURRENCY.NGN}>NGN (₦)</option>
                        <option value={CURRENCY.USD}>USD ($)</option>
                        <option value={CURRENCY.INR}>INR (₹)</option>
                    </select>
                </div>


                {/* Table */}
                <motion.div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs text-gray-400">Project</th>
                                    <th className="px-6 py-4 text-left text-xs text-gray-400">Owner</th>
                                    <th className="px-6 py-4 text-left text-xs text-gray-400">Status</th>
                                    <th className="px-6 py-4 text-left text-xs text-gray-400">Payment ({selectedCurrency})</th>
                                    <th className="px-6 py-4 text-left text-xs text-gray-400">Created</th>
                                    <th className="px-6 py-4 text-center text-xs text-gray-400">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-800">
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i}>
                                            <td colSpan="6" className="px-6 py-5">
                                                <div className="h-8 bg-gray-800 animate-pulse rounded" />
                                            </td>
                                        </tr>
                                    ))
                                ) : paginated.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-gray-500">
                                            No projects found
                                        </td>
                                    </tr>
                                ) : (
                                    paginated.map((p) => {
                                        const paidInTarget = convertToTargetCurrency(p.amountPaid, p.currency);
                                        const totalInTarget = convertToTargetCurrency(p.totalPrice, p.currency);

                                        return (
                                            <tr key={p.id} className="hover:bg-white/5 transition">
                                                <td className="px-6 py-4 font-semibold text-white">
                                                    {p.title}
                                                </td>
                                                <td className="px-6 py-4 text-gray-300">
                                                    {p.owner}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={p.status} />
                                                </td>
                                                <td className="px-6 py-4 text-gray-300 font-medium">
                                                    {getCurrencySymbol()}
                                                    {formatAmount(paidInTarget)} / {getCurrencySymbol()}
                                                    {formatAmount(totalInTarget)}
                                                </td>
                                                <td className="px-6 py-4 text-gray-400 text-sm">
                                                    {formatDate(p.createdAt)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex justify-center gap-3">
                                                        <IconBtn onClick={() => navigate(`/admin/projects/${p.id}`)}>
                                                            <Eye size={16} />
                                                        </IconBtn>
                                                        <IconBtn onClick={() => navigate(`/admin/projects/${p.id}/edit`)}>
                                                            <Pencil size={16} />
                                                        </IconBtn>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800">
                            <p className="text-sm text-gray-400">
                                Showing {(currentPage - 1) * projectsPerPage + 1} to{" "}
                                {Math.min(currentPage * projectsPerPage, filtered.length)} of{" "}
                                {filtered.length} projects
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition"
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                <div className="flex gap-1">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`px-3 py-1 rounded-lg text-sm transition ${currentPage === i + 1
                                                ? "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </AdminLayout>
    );
}

/* ================= UI HELPERS ================= */

function StatusBadge({ status }) {
    const map = {
        [PROJECT_STATUS.PENDING]: "bg-yellow-500/20 text-yellow-400",
        [PROJECT_STATUS.ACTIVE]: "bg-blue-500/20 text-blue-400",
        [PROJECT_STATUS.COMPLETED]: "bg-green-500/20 text-green-400",
        [PROJECT_STATUS.CANCELLED]: "bg-red-500/20 text-red-400",
        [PROJECT_STATUS.ON_HOLD]: "bg-gray-500/20 text-gray-300",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status] || "bg-gray-500/20 text-gray-300"}`}>
            {capitalize(status.replace("_", " "))}
        </span>
    );
}

function IconBtn({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition text-gray-300 hover:text-white"
        >
            {children}
        </button>
    );
}