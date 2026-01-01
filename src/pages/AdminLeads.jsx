import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/date";

import {
    Eye,
    Pencil,
    Plus,
    Search,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import AdminLayout from "../components/AdminLayout";
import { db } from "../lib/firebase";

export default function AdminLeads() {
    const navigate = useNavigate();


    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const leadsPerPage = 10;

    // Fetch all leads from Firebase
    const fetchLeads = async () => {
        try {
            setLoading(true);
            const allLeads = [];

            // Fetch from "leads"
            const leadsSnap = await getDocs(collection(db, "leads"));
            for (const d of leadsSnap.docs) {
                let data = d.data();
                if (!data.status) {
                    await updateDoc(doc(db, "leads", d.id), {
                        status: "new",
                        updatedAt: serverTimestamp(),
                    });
                    data = { ...data, status: "new" };
                }
                allLeads.push({
                    id: d.id,
                    collection: "leads",
                    businessName: data.businessName || "—",
                    fullName: data.name || data.fullName,
                    email: data.email,
                    phone: data.phone,
                    businessType: data.businessType || "—",
                    hasWebsite: data.hasWebsite || "No",
                    status: data.status,
                    country: data.country,
                    createdAt: (function () {
                        if (!data.createdAt) return "Unknown";
                        if (typeof data.createdAt.toDate === "function") {
                            // It's a Firebase Timestamp
                            return data.createdAt.toDate().toLocaleString();
                        }
                        if (data.createdAt instanceof Date) {
                            return data.createdAt.toLocaleString();
                        }
                        if (typeof data.createdAt === "string") {
                            return new Date(data.createdAt).toLocaleString();
                        }
                        return "Unknown";
                    })(),
                });
            }

            // Fetch from "free_website_promo"
            const promoSnap = await getDocs(collection(db, "free_website_promo"));
            for (const d of promoSnap.docs) {
                let data = d.data();
                if (!data.status) {
                    await updateDoc(doc(db, "free_website_promo", d.id), {
                        status: "new",
                        updatedAt: serverTimestamp(),
                    });
                    data = { ...data, status: "new" };
                }
                allLeads.push({
                    id: d.id,
                    collection: "free_website_promo",
                    businessName: data.businessName || "—",
                    fullName: data.fullName,
                    email: data.email,
                    phone: data.phone,
                    businessType: data.businessType,
                    hasWebsite: data.hasWebsite || "No",
                    status: data.status,
                    country: data.country,
                    createdAt: (function () {
                        if (!data.createdAt) return "Unknown";
                        if (typeof data.createdAt.toDate === "function") {
                            return data.createdAt.toDate().toLocaleString();
                        }
                        if (data.createdAt instanceof Date) {
                            return data.createdAt.toLocaleString();
                        }
                        if (typeof data.createdAt === "string") {
                            try {
                                return new Date(data.createdAt).toLocaleString();
                            } catch {
                                return data.createdAt;
                            }
                        }
                        return "Unknown";
                    })(),
                });
            }

            // Sort by createdAt descending
            allLeads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setLeads(allLeads);
        } catch (err) {
            console.error("Failed to fetch leads:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    // Filter leads
    const filteredLeads = leads.filter((lead) => {
        const matchesSearch =
            lead.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Pagination
    const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
    const paginatedLeads = filteredLeads.slice(
        (currentPage - 1) * leadsPerPage,
        currentPage * leadsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            // Set timestamps
            data.createdAt = new Date().toISOString();
            data.updatedAt = new Date().toISOString();
            data.status = data.status || "new";

            // Save to selected collection
            await addDoc(collection(db, data.collection), data);

            // Refresh leads
            await fetchLeads();
            setIsModalOpen(false);
        } catch (err) {
            console.error("Failed to save lead:", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-white">Leads</h1>
                        <p className="text-gray-400 mt-2">
                            Manage and track all incoming leads from the Free Website Promo
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-3 bg-white text-black px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Lead
                    </button>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by business, name, or email..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-12 pr-5 py-4 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="px-5 py-4 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500/50 transition"
                    >
                        <option value="all">All Status</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                {/* Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900/80 backdrop-blur border border-gray-800 rounded-2xl overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800/50">
                                <tr>
                                    <th className="px-6 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Business</th>
                                    <th className="px-6 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Website</th>
                                    <th className="px-6 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
                                    <th className="px-6 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <tr key={index}>
                                            <td colSpan="7" className="px-6 py-5">
                                                <div className="animate-pulse bg-gray-800 h-8 rounded"></div>
                                            </td>
                                        </tr>
                                    ))
                                ) : paginatedLeads.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-12 text-gray-500">
                                            No leads found matching your criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedLeads.map((lead, index) => (
                                        <motion.tr
                                            key={lead.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-white/5 transition-colors"
                                        >
                                            <td className="px-6 py-5">
                                                <div className="font-semibold text-white">{lead.businessName}</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="font-medium text-white">{lead.fullName}</div>
                                                <div className="text-sm text-gray-400 mt-1">{lead.email}</div>
                                                <div className="text-xs text-gray-500 mt-1">{lead.phone}</div>
                                            </td>
                                            <td className="px-6 py-5 text-gray-300">{lead.businessType}</td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${lead.hasWebsite === "Yes" ? "bg-green-500/20 text-green-400" : "bg-gray-700 text-gray-300"}`}>
                                                    {lead.hasWebsite}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <StatusBadge status={lead.status} />
                                            </td>
                                            <td className="px-6 py-5 text-gray-400 text-sm">{formatDate(lead.createdAt)}</td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-center gap-4">
                                                    <ActionButton
                                                        icon={<Eye className="w-4 h-4" />}
                                                        label="View"
                                                        onClick={() => navigate(`/admin/leads/${lead.id}`)}
                                                    />
                                                    <ActionButton
                                                        icon={<Pencil className="w-4 h-4" />}
                                                        label="Edit"
                                                        onClick={() => navigate(`/admin/leads/${lead.id}/edit`)}
                                                    />
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800">
                            <p className="text-sm text-gray-400">
                                Showing {(currentPage - 1) * leadsPerPage + 1} to{" "}
                                {Math.min(currentPage * leadsPerPage, filteredLeads.length)} of {filteredLeads.length} leads
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <div className="flex gap-1">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${currentPage === i + 1
                                                ? "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                                                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Add New Lead Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <form onSubmit={handleSubmit}>
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-3xl font-bold text-white">Add New Lead</h2>
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="p-2 hover:bg-gray-800 rounded-lg transition"
                                        >
                                            <X className="w-6 h-6 text-gray-400" />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <InputField name="businessName" label="Business Name" placeholder="e.g. Bright Salon" required />
                                            <InputField name="fullName" label="Full Name" placeholder="e.g. Aisha Bello" required />
                                            <InputField name="email" type="email" label="Email" placeholder="aisha@example.com" required />
                                            <InputField name="phone" label="Phone Number" placeholder="+234 803 123 4567" required />
                                            <InputField name="businessType" label="Business Type" placeholder="e.g. Salon, Restaurant" />
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Has Website?</label>
                                                <select name="hasWebsite" className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500/50 transition">
                                                    <option value="No">No</option>
                                                    <option value="Yes">Yes</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                                                <select name="status" className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500/50 transition">
                                                    <option value="new">New</option>
                                                    <option value="contacted">Contacted</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                            </div>
                                            <InputField name="country" label="Country" placeholder="e.g. NG" />
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Collection</label>
                                                <select name="collection" required className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500/50 transition">
                                                    <option value="">Select Collection</option>
                                                    <option value="leads">Leads</option>
                                                    <option value="free_website_promo">Free Website Promo</option>
                                                </select>
                                            </div>
                                            {/* Additional fields */}
                                            <InputField name="websiteUrl" label="Website URL (if yes)" placeholder="https://example.com" />
                                            <InputField name="notes" label="Notes" placeholder="Additional notes..." />
                                        </div>

                                        <div className="flex justify-end gap-4 pt-6">
                                            <button
                                                type="button"
                                                onClick={() => setIsModalOpen(false)}
                                                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-medium transition"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={saving}
                                                className="px-8 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {saving ? "Saving..." : "Save Lead"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
}

/* ======================= COMPONENTS ======================= */

function StatusBadge({ status }) {
    const config = {
        new: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
        contacted: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
        completed: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
    };

    const style = config[status] || { bg: "bg-gray-700", text: "text-gray-300", border: "" };

    return (
        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

function ActionButton({ icon, label, onClick }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={label}
            className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 hover:text-white transition"
        >
            {icon}
        </motion.button>
    );
}

function InputField({ name, label, type = "text", placeholder, required = false }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition placeholder:text-gray-500"
            />
        </div>
    );
}