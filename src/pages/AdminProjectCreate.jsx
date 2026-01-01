import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    collection,
    addDoc,
    getDocs,
} from "firebase/firestore";

import AdminLayout from "../components/AdminLayout";
import { db } from "../lib/firebase";

import {
    PROJECT_STATUS,
    PAYMENT_STATUS,
    CURRENCY,
} from "../constants/projectConstants";

import { capitalize } from "../utils/text";

export default function AdminProjectCreate() {
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);

    /* ================= FETCH LEADS ================= */
    useEffect(() => {
        const fetchLeads = async () => {
            const snapshot = await getDocs(collection(db, "leads"));
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setLeads(data);
        };

        fetchLeads();
    }, []);

    /* ================= SUBMIT ================= */
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

                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: "admin",
            };

            await addDoc(collection(db, "projects"), payload);
            navigate("/admin/projects");
        } catch (err) {
            console.error(err);
            alert("Failed to create project");
        } finally {
            setSaving(false);
        }
    };

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
                        Create New Project
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-10">

                        {/* BASIC INFO */}
                        <Section title="Basic Information">
                            <InputField name="projectTitle" label="Project Title" required />
                            <InputField name="projectDescription" label="Project Description" textarea />
                        </Section>

                        {/* CLIENT (FROM LEADS) */}
                        <Section title="Client">
                            <SelectField
                                label="Select Lead"
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
                                value={selectedLead?.fullName || ""}
                                readOnly
                                required
                            />

                            <InputField
                                name="clientEmail"
                                label="Client Email"
                                value={selectedLead?.emailAddress || ""}
                                readOnly
                                required
                            />

                            <InputField
                                name="clientPhone"
                                label="Client Phone"
                                value={selectedLead?.phoneNumber || ""}
                                readOnly
                                required
                            />
                        </Section>

                        {/* STATUS */}
                        <Section title="Status & Timeline">
                            <SelectField
                                name="projectStatus"
                                label="Project Status"
                                defaultValue={PROJECT_STATUS.PENDING}
                            >
                                {Object.values(PROJECT_STATUS).map(status => (
                                    <option key={status} value={status}>
                                        {capitalize(status)}
                                    </option>
                                ))}
                            </SelectField>

                            <InputField name="startDate" label="Start Date" type="date" />
                            <InputField name="endDate" label="End Date" type="date" />
                        </Section>

                        {/* PAYMENT */}
                        <Section title="Payment Details">
                            <InputField name="totalPrice" label="Total Price" type="number" required />
                            <InputField name="amountPaid" label="Amount Paid" type="number" />

                            <SelectField
                                name="currency"
                                label="Currency"
                                defaultValue={CURRENCY.NGN}
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
                                defaultValue={PAYMENT_STATUS.PENDING}
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
                            <InputField name="notes" label="Internal Notes" textarea />
                        </Section>

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate("/admin/projects")}
                                className="px-6 py-3 bg-gray-700 rounded-xl"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="px-8 py-3 bg-white text-black rounded-xl font-semibold"
                            >
                                {saving ? "Creating..." : "Create Project"}
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

function InputField({ name, label, type = "text", textarea, required, value, readOnly }) {
    return (
        <div>
            <label className="block text-sm text-gray-300 mb-2">
                {label} {required && "*"}
            </label>
            {textarea ? (
                <textarea
                    name={name}
                    value={value}
                    readOnly={readOnly}
                    required={required}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl"
                />
            ) : (
                <input
                    name={name}
                    type={type}
                    value={value}
                    readOnly={readOnly}
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
