import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
    collection,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";

import AdminLayout from "../components/AdminLayout";
import { db } from "../lib/firebase";

import {
    PROJECT_STATUS,
    PAYMENT_STATUS,
    CURRENCY,
} from "../constants/projectConstants";

import { capitalize } from "../utils/text";

export default function AdminProjectEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);
    const [project, setProject] = useState(null);

    /* ================= FETCH LEADS ================= */
    useEffect(() => {
        const fetchLeads = async () => {
            const snap = await getDocs(collection(db, "leads"));
            setLeads(
                snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        };
        fetchLeads();
    }, []);

    /* ================= FETCH PROJECT ================= */
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const snap = await getDoc(doc(db, "projects", id));
                if (!snap.exists()) return;

                const data = snap.data();
                setProject(data);
                setSelectedLead({
                    id: data.projectOwnerId,
                    ...data.projectOwnerSnapshot,
                });
            } catch (err) {
                console.error("Failed to fetch project", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProject();
    }, [id]);

    /* ================= UPDATE ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (saving) return;

        setSaving(true);

        try {
            const formData = new FormData(e.target);
            const values = Object.fromEntries(formData.entries());

            const payload = {
                projectTitle: values.projectTitle,
                projectDescription: values.projectDescription || "",

                projectOwnerId: selectedLead?.id || "",
                projectOwnerSnapshot: {
                    fullName: values.clientFullName,
                    emailAddress: values.clientEmail,
                    phoneNumber: values.clientPhone,
                },

                projectStatus: values.projectStatus,
                startDate: values.startDate || null,
                endDate: values.endDate || null,

                totalPrice: Number(values.totalPrice) || 0,
                amountPaid: Number(values.amountPaid) || 0,
                currency: values.currency,
                paymentStatus: values.paymentStatus,

                notes: values.notes || "",
                updatedAt: serverTimestamp(),
            };

            await updateDoc(doc(db, "projects", id), payload);
            navigate(`/admin/projects/${id}`);
        } catch (err) {
            console.error(err);
            alert("Failed to update project");
        } finally {
            setSaving(false);
        }
    };

    if (loading || !project) {
        return (
            <AdminLayout>
                <div className="p-8 text-gray-400">Loading project...</div>
            </AdminLayout>
        );
    }

    /* ================= UI ================= */
    return (
        <AdminLayout>
            <div className="flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-2xl p-8"
                >
                    <h1 className="text-3xl font-bold text-white mb-8">
                        Edit Project
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-10">

                        {/* BASIC INFO */}
                        <Section title="Basic Information">
                            <InputField
                                name="projectTitle"
                                label="Project Title"
                                defaultValue={project.projectTitle}
                                required
                            />
                            <InputField
                                name="projectDescription"
                                label="Project Description"
                                textarea
                                defaultValue={project.projectDescription}
                            />
                        </Section>

                        {/* CLIENT */}
                        <Section title="Client">
                            <SelectField
                                label="Select Lead"
                                defaultValue={project.projectOwnerId}
                                onChange={(e) => {
                                    const lead = leads.find(l => l.id === e.target.value);
                                    setSelectedLead(lead || null);
                                }}
                            >
                                <option value="">Select a lead</option>
                                {leads.map(lead => (
                                    <option key={lead.id} value={lead.id}>
                                        {lead.fullName}
                                    </option>
                                ))}
                            </SelectField>

                            <InputField
                                name="clientFullName"
                                label="Client Full Name"
                                defaultValue={project.projectOwnerSnapshot?.fullName}
                                required
                            />

                            <InputField
                                name="clientEmail"
                                label="Client Email"
                                defaultValue={project.projectOwnerSnapshot?.emailAddress}
                                required
                            />

                            <InputField
                                name="clientPhone"
                                label="Client Phone"
                                defaultValue={project.projectOwnerSnapshot?.phoneNumber}
                                required
                            />
                        </Section>

                        {/* STATUS */}
                        <Section title="Status & Timeline">
                            <SelectField
                                name="projectStatus"
                                label="Project Status"
                                defaultValue={project.projectStatus}
                            >
                                {Object.values(PROJECT_STATUS).map(status => (
                                    <option key={status} value={status}>
                                        {capitalize(status)}
                                    </option>
                                ))}
                            </SelectField>

                            <InputField
                                name="startDate"
                                label="Start Date"
                                type="date"
                                defaultValue={project.startDate}
                            />

                            <InputField
                                name="endDate"
                                label="End Date"
                                type="date"
                                defaultValue={project.endDate}
                            />
                        </Section>

                        {/* PAYMENT */}
                        <Section title="Payment Details">
                            <InputField
                                name="totalPrice"
                                label="Total Price"
                                type="number"
                                defaultValue={project.totalPrice}
                                required
                            />

                            <InputField
                                name="amountPaid"
                                label="Amount Paid"
                                type="number"
                                defaultValue={project.amountPaid}
                            />

                            <SelectField
                                name="currency"
                                label="Currency"
                                defaultValue={project.currency}
                            >
                                {Object.values(CURRENCY).map(curr => (
                                    <option key={curr} value={curr}>
                                        {curr}
                                    </option>
                                ))}
                            </SelectField>

                            <SelectField
                                name="paymentStatus"
                                label="Payment Status"
                                defaultValue={project.paymentStatus}
                            >
                                {Object.values(PAYMENT_STATUS).map(status => (
                                    <option key={status} value={status}>
                                        {capitalize(status)}
                                    </option>
                                ))}
                            </SelectField>
                        </Section>

                        {/* NOTES */}
                        <Section title="Additional Notes">
                            <InputField
                                name="notes"
                                label="Internal Notes"
                                textarea
                                defaultValue={project.notes}
                            />
                        </Section>

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate(`/admin/projects/${id}`)}
                                className="px-6 py-3 bg-gray-700 rounded-xl"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="px-8 py-3 bg-white text-black rounded-xl font-semibold"
                            >
                                {saving ? "Updating..." : "Update Project"}
                            </button>
                        </div>

                    </form>
                </motion.div>
            </div>
        </AdminLayout>
    );
}

/* ================= REUSABLE ================= */

function Section({ title, children }) {
    return (
        <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}

function InputField({ name, label, type = "text", textarea, required, defaultValue }) {
    return (
        <div>
            <label className="block text-sm text-gray-300 mb-2">
                {label} {required && "*"}
            </label>
            {textarea ? (
                <textarea
                    name={name}
                    defaultValue={defaultValue}
                    required={required}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl"
                />
            ) : (
                <input
                    name={name}
                    type={type}
                    defaultValue={defaultValue}
                    required={required}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl"
                />
            )}
        </div>
    );
}

function SelectField({ name, label, children, defaultValue, onChange }) {
    return (
        <div>
            <label className="block text-sm text-gray-300 mb-2">
                {label}
            </label>
            <select
                name={name}
                defaultValue={defaultValue}
                onChange={onChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl"
            >
                {children}
            </select>
        </div>
    );
}
