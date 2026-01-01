import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Mail,
    Phone,
    Edit3,
    DollarSign,
} from "lucide-react";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

import AdminLayout from "../components/AdminLayout";
import { db } from "../lib/firebase";
import { formatDate } from "../utils/date";
import { capitalize } from "../utils/text";

import {
    PROJECT_STATUS,
    PAYMENT_STATUS,
} from "../constants/projectConstants";

export default function ProjectDetailView() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    const [editingNotes, setEditingNotes] = useState(false);
    const [notes, setNotes] = useState("");
    const [savingNotes, setSavingNotes] = useState(false);

    /* ================= FETCH PROJECT ================= */
    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                const snap = await getDoc(doc(db, "projects", id));
                if (!snap.exists()) {
                    setProject(null);
                    return;
                }
                const data = snap.data();
                setProject(data);
                setNotes(data.notes || "");
            } catch (err) {
                console.error("Error fetching project:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProject();
    }, [id]);

    /* ================= SAVE NOTES ================= */
    const handleSaveNotes = async () => {
        if (savingNotes) return;
        setSavingNotes(true);

        try {
            await updateDoc(doc(db, "projects", id), {
                notes: notes.trim(),
                updatedAt: serverTimestamp(),
            });

            setProject(prev => ({ ...prev, notes: notes.trim() }));
            setEditingNotes(false);
        } catch (err) {
            console.error("Failed to save notes:", err);
        } finally {
            setSavingNotes(false);
        }
    };

    /* ================= STATES ================= */
    if (loading) {
        return (
            <AdminLayout>
                <div className="p-8 animate-pulse space-y-6">
                    <div className="h-8 bg-gray-800 rounded w-64" />
                    <div className="grid md:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="h-40 bg-gray-900 border border-gray-800 rounded-2xl"
                            />
                        ))}
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (!project) {
        return (
            <AdminLayout>
                <div className="p-8 text-center text-gray-400 text-xl">
                    Project not found
                </div>
            </AdminLayout>
        );
    }

    const createdAt =
        project.createdAt?.toDate?.() ||
        new Date(project.createdAt || Date.now());

    const updatedAt =
        project.updatedAt?.toDate?.() || createdAt;

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto p-6 space-y-8">

                {/* BACK */}
                <Link
                    to="/admin/projects"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Projects
                </Link>

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 border border-gray-800 rounded-2xl p-8"
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">
                                {project.projectTitle || "—"}
                            </h1>
                            <p className="text-xl text-gray-300">
                                {project.projectOwnerSnapshot?.fullName || "—"}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">
                                    Project Status
                                </p>
                                <StatusBadge status={project.projectStatus} />
                            </div>

                            <div>
                                <p className="text-gray-400 text-sm mb-1">
                                    Payment Status
                                </p>
                                <StatusBadge
                                    status={project.paymentStatus}
                                    type="payment"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* INFO GRID */}
                <div className="grid md:grid-cols-2 gap-6">
                    <StatCard title="Client Information">
                        <InfoRow
                            icon={<Mail />}
                            label="Email"
                            value={project.projectOwnerSnapshot?.emailAddress}
                            href={
                                project.projectOwnerSnapshot?.emailAddress &&
                                `mailto:${project.projectOwnerSnapshot.emailAddress}`
                            }
                        />
                        <InfoRow
                            icon={<Phone />}
                            label="Phone"
                            value={project.projectOwnerSnapshot?.phoneNumber}
                            href={
                                project.projectOwnerSnapshot?.phoneNumber &&
                                `tel:${project.projectOwnerSnapshot.phoneNumber}`
                            }
                        />
                    </StatCard>

                    <StatCard title="Payment Information">
                        <InfoRow
                            icon={<DollarSign />}
                            label="Total Price"
                            value={`${project.currency} ${project.totalPrice}`}
                        />
                        <InfoRow
                            icon={<DollarSign />}
                            label="Amount Paid"
                            value={`${project.currency} ${project.amountPaid}`}
                        />
                    </StatCard>
                </div>

                {/* DESCRIPTION */}
                <StatCard title="Project Description">
                    <p className="text-gray-300 whitespace-pre-wrap">
                        {project.projectDescription || "—"}
                    </p>
                </StatCard>

                {/* NOTES */}
                <StatCard title="Internal Notes">
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
                                        setNotes(project.notes || "");
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
                                {project.notes || (
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

                {/* SYSTEM */}
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
                        <InfoRow label="Project ID" value={id} code />
                    </div>
                </StatCard>
            </div>
        </AdminLayout>
    );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
        >
            <h2 className="text-xl font-semibold text-white mb-4">
                {title}
            </h2>
            <div className="space-y-4">{children}</div>
        </motion.div>
    );
}

function InfoRow({ icon, label, value, href, code }) {
    if (!value) return null;

    const content = (
        <div className="flex items-start gap-4">
            {icon && <div className="text-gray-400 mt-1">{icon}</div>}
            <div>
                <p className="text-gray-400 text-sm">{label}</p>
                <p className="font-medium text-white">{value}</p>
            </div>
        </div>
    );

    if (href) {
        return (
            <a
                href={href}
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

function StatusBadge({ status, type }) {
    const styles =
        type === "payment"
            ? {
                [PAYMENT_STATUS.PENDING]: "bg-yellow-500/20 text-yellow-400",
                [PAYMENT_STATUS.PAID]: "bg-green-500/20 text-green-400",
                [PAYMENT_STATUS.PARTIAL]: "bg-blue-500/20 text-blue-400",
            }
            : {
                [PROJECT_STATUS.PENDING]: "bg-yellow-500/20 text-yellow-400",
                [PROJECT_STATUS.ACTIVE]: "bg-blue-500/20 text-blue-400",
                [PROJECT_STATUS.COMPLETED]: "bg-green-500/20 text-green-400",
                [PROJECT_STATUS.CANCELLED]: "bg-red-500/20 text-red-400",
            };

    return (
        <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${styles[status]
                }`}
        >
            {capitalize(status)}
        </span>
    );
}
