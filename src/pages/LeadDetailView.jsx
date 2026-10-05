import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Globe,
    Mail,
    Phone,
    Edit3,
} from "lucide-react";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import AdminLayout from "../components/AdminLayout";
import { db } from "../lib/firebase";
import { formatDate } from "../utils/date";
import { LEAD_STATUS } from "../constants/lead.constants";

export default function LeadDetailView() {
    const { id } = useParams();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingNotes, setEditingNotes] = useState(false);
    const [notes, setNotes] = useState("");
    const [savingNotes, setSavingNotes] = useState(false);

    useEffect(() => {
        const fetchLead = async () => {
            try {
                setLoading(true);
                const snap = await getDoc(doc(db, "leads", id));
                if (!snap.exists()) {
                    setLead(null);
                    return;
                }
                const data = snap.data();
                setLead(data);
                setNotes(data.notes || "");
            } catch (err) {
                console.error("Error fetching lead:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchLead();
    }, [id]);

    const handleSaveNotes = async () => {
        if (savingNotes) return;
        setSavingNotes(true);
        try {
            await updateDoc(doc(db, "leads", id), {
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
                <div className="p-8 animate-pulse space-y-6">
                    <div className="h-8 bg-gray-800 rounded w-64" />
                    <div className="grid md:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-40 bg-gray-900 border border-gray-800 rounded-2xl" />
                        ))}
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (!lead) {
        return (
            <AdminLayout>
                <div className="p-8 text-center text-gray-400 text-xl">
                    Lead not found
                </div>
            </AdminLayout>
        );
    }

    const createdAt =
        lead.createdAt?.toDate?.() ||
        new Date(lead.createdAt || Date.now());
    const updatedAt =
        lead.updatedAt?.toDate?.() || createdAt;

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                <Link
                    to="/admin/leads"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Leads
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 border border-gray-800 rounded-2xl p-8"
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">
                                {lead.businessName || "-"}
                            </h1>
                            <p className="text-xl text-gray-300">
                                {lead.fullName || "-"}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Status</p>
                                <StatusBadge status={lead.leadStatus} />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Source</p>
                                <p className="font-medium text-white">
                                    {lead.source || "-"}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    <StatCard title="Contact Information">
                        <InfoRow
                            icon={<Mail />}
                            label="Personal Email"
                            value={lead.emailAddress}
                            href={lead.emailAddress && `mailto:${lead.emailAddress}`}
                        />
                        <InfoRow
                            icon={<Mail />}
                            label="Business Email"
                            value={lead.businessEmail}
                            href={lead.businessEmail && `mailto:${lead.businessEmail}`}
                        />
                        <InfoRow
                            icon={<Phone />}
                            label="Phone Number"
                            value={lead.phoneNumber}
                            href={lead.phoneNumber && `tel:${lead.phoneNumber}`}
                        />
                        <InfoRow
                            icon={<Globe />}
                            label="Country"
                            value={lead.country?.toUpperCase()}
                        />
                    </StatCard>

                    <StatCard title="Business Details">
                        <InfoRow label="Business Type" value={lead.businessType} />
                        <InfoRow
                            label="Interested Service"
                            value={lead.interestedService}
                        />
                        <InfoRow
                            label="Has Website"
                            value={lead.hasAWebsite === true ? "Yes" : "No"}
                            badge={lead.hasAWebsite === true}
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
                </div>

                <StatCard title="Project Description">
                    <p className="text-gray-300 whitespace-pre-wrap">
                        {lead.projectDescription || "-"}
                    </p>
                </StatCard>

                <StatCard title="Notes">
                    {editingNotes ? (
                        <div className="space-y-4">
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={6}
                                className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-white/30 resize-none"
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setNotes(lead.notes || "");
                                        setEditingNotes(false);
                                    }}
                                    className="px-5 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveNotes}
                                    disabled={savingNotes}
                                    className="px-6 py-3 bg-white text-black rounded-xl font-medium"
                                >
                                    {savingNotes ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="relative group">
                            <div className="min-h-[120px] text-gray-300 whitespace-pre-wrap">
                                {lead.notes || (
                                    <span className="text-gray-500 italic">
                                        No notes yet.
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => setEditingNotes(true)}
                                className="absolute top-0 right-0 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition"
                            >
                                <Edit3 className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </StatCard>

                <StatCard title="System Information">
                    <div className="grid md:grid-cols-3 gap-6">
                        <InfoRow
                            icon={<Calendar />}
                            label="Created At"
                            value={formatDate(createdAt)}
                        />
                        <InfoRow
                            icon={<Clock />}
                            label="Updated At"
                            value={formatDate(updatedAt)}
                        />
                        <InfoRow label="Lead ID" value={id} code />
                    </div>
                </StatCard>
            </div>
        </AdminLayout>
    );
}

function StatCard({ title, children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
        >
            <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
            <div className="space-y-4">{children}</div>
        </motion.div>
    );
}

function InfoRow({ icon, label, value, href, link, badge, code }) {
    if (!value) return null;

    const content = (
        <div className="flex items-start gap-4">
            {icon && <div className="text-gray-400 mt-1">{icon}</div>}
            <div>
                <p className="text-gray-400 text-sm">{label}</p>
                <p className={`font-medium ${badge ? "text-green-400" : "text-white"}`}>
                    {value}
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
                className="block py-2 hover:bg-white/5 px-3 -mx-3 rounded-lg"
            >
                {content}
            </a>
        );
    }

    if (code) {
        return (
            <div>
                <p className="text-gray-400 text-sm">{label}</p>
                <code className="bg-gray-800 px-3 py-1 rounded text-sm text-gray-300">
                    {value}
                </code>
            </div>
        );
    }

    return <div className="py-2">{content}</div>;
}

function StatusBadge({ status }) {
    const styles = {
        [LEAD_STATUS.NEW]: "bg-purple-500/20 text-purple-400",
        [LEAD_STATUS.CONTACTED]: "bg-blue-500/20 text-blue-400",
        [LEAD_STATUS.QUALIFIED]: "bg-yellow-500/20 text-yellow-400",
        [LEAD_STATUS.CONVERTED]: "bg-green-500/20 text-green-400",
        [LEAD_STATUS.LOST]: "bg-red-500/20 text-red-400",
    };

    return (
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${styles[status]}`}>
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
        </span>
    );
}
