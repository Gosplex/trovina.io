import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Globe, Mail, Phone, Edit3, DollarSign } from "lucide-react";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import AdminLayout from "../components/AdminLayout";
import { db } from "../lib/firebase";
import { formatDate } from "../utils/date";


export default function LeadDetailView() {
    const { id } = useParams();
    const [lead, setLead] = useState(null);
    const [collectionName, setCollectionName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingNotes, setEditingNotes] = useState(false);
    const [notes, setNotes] = useState("");
    const [savingNotes, setSavingNotes] = useState(false);

    useEffect(() => {
        const fetchLead = async () => {
            try {
                setLoading(true);

                // Try "leads" collection first
                let docRef = doc(db, "leads", id);
                let docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCollectionName("leads");
                    const data = docSnap.data();
                    setLead(data);
                    setNotes(data.notes || "");
                    return;
                }

                // Try "free_website_promo"
                docRef = doc(db, "free_website_promo", id);
                docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCollectionName("free_website_promo");
                    const data = docSnap.data();
                    setLead(data);
                    setNotes(data.notes || "");
                } else {
                    console.error("Lead not found");
                }
            } catch (err) {
                console.error("Error fetching lead:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchLead();
    }, [id]);

    const handleSaveNotes = async () => {
        if (!collectionName || savingNotes) return;

        setSavingNotes(true);
        try {
            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, {
                notes: notes.trim(),
                updatedAt: serverTimestamp(),
            });
            setLead((prev) => ({ ...prev, notes: notes.trim() }));
            setEditingNotes(false);
        } catch (err) {
            console.error("Failed to save notes:", err);
        } finally {
            setSavingNotes(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-8">
                    <div className="animate-pulse space-y-8">
                        <div className="h-8 bg-gray-800 rounded w-64" />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-32" />
                            ))}
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (!lead) {
        return (
            <AdminLayout>
                <div className="p-8 text-center text-gray-400 text-xl">Lead not found</div>
            </AdminLayout>
        );
    }

    const source = collectionName === "free_website_promo" ? "Free Website Promo" : "Direct Lead";
    const createdDate = lead.createdAt?.toDate?.() || new Date(lead.createdAt || Date.now());
    const updatedDate = lead.updatedAt?.toDate?.() || createdDate;

    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
        }).format(value || 0);



    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Back Button */}
                <a
                    href="/admin/leads"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Leads
                </a>

                {/* 1️⃣ BASIC INFO - Top Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 border border-gray-800 rounded-2xl p-8"
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-3">
                                {lead.businessName || "No Business Name"}
                            </h1>
                            <p className="text-xl text-gray-300">{lead.name || lead.fullName || "—"}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Status</p>
                                <StatusBadge status={lead.status || "new"} />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Source</p>
                                <p className="font-medium text-white">{source}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Collection</p>
                                <code className="bg-gray-800 px-3 py-1 rounded text-sm text-gray-300">
                                    {collectionName}
                                </code>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 2️⃣ CONTACT INFO + PAYMENT DETAILS - Side by Side */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Contact Info Card */}
                    <StatCard title="Contact Information">
                        <InfoRow icon={<Mail />} label="Email" value={lead.email} href={`mailto:${lead.email}`} />
                        <InfoRow icon={<Phone />} label="Phone" value={lead.phone} href={`tel:${lead.phone}`} />
                        <InfoRow icon={<Globe />} label="Country" value={lead.country?.toUpperCase() || "—"} />
                        {lead.phone && (
                            <InfoRow
                                icon={<Phone className="text-green-400" />}
                                label="WhatsApp"
                                value={lead.phone}
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                            />
                        )}
                    </StatCard>

                    {/* Payment Details Card */}
                    <StatCard title="Payment Details">
                        <InfoRow
                            icon={<DollarSign />}
                            label="Amount Paid"
                            value={formatCurrency(lead.amountPaid)}
                        />
                        <InfoRow
                            icon={<Calendar />}
                            label="Date Paid"
                            value={lead.datePaid ? formatDate(new Date(lead.datePaid)) : "Not paid yet"}
                        />
                        <InfoRow
                            label="Payment Status"
                            value={lead.amountPaid > 0 ? "Paid" : "Pending"}
                            badge={lead.amountPaid > 0}
                        />
                    </StatCard>
                </div>

                {/* 3️⃣ BUSINESS INFO + NOTES - Side by Side */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Business Info Card */}
                    <StatCard title="Business Details">
                        <InfoRow label="Business Type" value={lead.businessType || "—"} />
                        <InfoRow
                            label="Has Website"
                            value={lead.hasWebsite || "No"}
                            badge={lead.hasWebsite === "Yes"}
                        />
                        {lead.websiteUrl && (
                            <InfoRow
                                icon={<Globe />}
                                label="Website URL"
                                value={lead.websiteUrl}
                                href={lead.websiteUrl}
                                link
                            />
                        )}
                    </StatCard>

                    {/* Notes Card */}
                    <StatCard title="Notes & Follow-ups">
                        {editingNotes ? (
                            <div className="space-y-4">
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows="6"
                                    className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-white/30 resize-none placeholder:text-gray-500"
                                    placeholder="Add internal notes, follow-up tasks, etc..."
                                />
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => {
                                            setNotes(lead.notes || "");
                                            setEditingNotes(false);
                                        }}
                                        className="px-5 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveNotes}
                                        disabled={savingNotes}
                                        className="px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition"
                                    >
                                        {savingNotes ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative group">
                                <div className="min-h-[120px] p-5 text-gray-300 whitespace-pre-wrap">
                                    {lead.notes || (
                                        <span className="text-gray-500 italic">No notes yet. Click edit to add.</span>
                                    )}
                                </div>
                                <button
                                    onClick={() => setEditingNotes(true)}
                                    className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition"
                                >
                                    <Edit3 className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </StatCard>
                </div>

                {/* 4️⃣ SYSTEM INFO - Small Card */}
                <StatCard title="System Information">
                    <div className="grid md:grid-cols-3 gap-6 text-sm">
                        <InfoRow icon={<Calendar />} label="Created At" value={formatDate(createdDate)} />
                        <InfoRow icon={<Clock />} label="Updated At" value={formatDate(updatedDate)} />
                        <InfoRow label="Lead ID" value={id} code />
                    </div>
                </StatCard>
            </div>
        </AdminLayout>
    );
}

/* ======================= REUSED FROM DASHBOARD ======================= */

function StatCard({ title, children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
        >
            <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>
            <div className="space-y-4">{children}</div>
        </motion.div>
    );
}

function InfoRow({ icon, label, value, href, link, badge, code }) {
    const content = (
        <div className="flex items-center gap-4">
            {icon && <div className="text-gray-400">{icon}</div>}
            <div>
                <p className="text-gray-400 text-sm">{label}</p>
                <p className={`font-medium text-white ${badge ? "text-green-400" : ""}`}>
                    {value || "—"}
                </p>
            </div>
        </div>
    );

    if (href) {
        return (
            <a
                href={href}
                target={link ? "_blank" : undefined}
                rel={link ? "noopener noreferrer" : undefined}
                className="block py-3 hover:bg-white/5 px-4 -mx-4 rounded-lg transition"
            >
                {content}
            </a>
        );
    }

    if (code) {
        return (
            <div className="py-3">
                <p className="text-gray-400 text-sm">{label}</p>
                <code className="bg-gray-800 px-3 py-1 rounded text-sm font-mono text-gray-300">
                    {value}
                </code>
            </div>
        );
    }

    return <div className="py-3">{content}</div>;
}

function StatusBadge({ status }) {
    const styles = {
        new: "bg-gray-700 text-gray-300",
        contacted: "bg-blue-500/20 text-blue-400",
        completed: "bg-green-500/20 text-green-400",
    };
    return (
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${styles[status] || styles.new}`}>
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
        </span>
    );
}