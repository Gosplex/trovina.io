import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import AdminLayout from "../components/AdminLayout";
import { db } from "../lib/firebase";
import { LEAD_STATUS } from "../constants/lead.constants";
import { BUSINESS_TYPES, HAS_WEBSITE } from '../constants/businessTypes'
import { capitalize } from "../utils/text";

export default function LeadEditView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        businessName: "",
        businessEmail: "",
        businessType: "",
        interestedService: "",
        projectDescription: "",
        hasAWebsite: false,
        websiteUrl: "",
        country: "",
        leadStatus: LEAD_STATUS.NEW,
        source: "",
        notes: "",
    });

    useEffect(() => {
        const fetchLead = async () => {
            const snap = await getDoc(doc(db, "leads", id));
            if (!snap.exists()) {
                navigate("/admin/leads");
                return;
            }

            const data = snap.data();
            setForm({
                fullName: data.fullName || "",
                emailAddress: data.emailAddress || "",
                phoneNumber: data.phoneNumber || "",
                businessName: data.businessName || "",
                businessEmail: data.businessEmail || "",
                businessType: data.businessType || "",
                interestedService: data.interestedService || "",
                projectDescription: data.projectDescription || "",
                hasAWebsite: data.hasAWebsite === true,
                websiteUrl: data.websiteUrl || "",
                country: data.country || "",
                leadStatus: data.leadStatus || LEAD_STATUS.NEW,
                source: data.source || "",
                notes: data.notes || "",
            });

            setLoading(false);
        };

        fetchLead();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        await updateDoc(doc(db, "leads", id), {
            ...form,
            websiteUrl: form.hasAWebsite ? form.websiteUrl : null,
            updatedAt: serverTimestamp(),
        });
        navigate(`/admin/leads/${id}`);
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-8 animate-pulse space-y-6">
                    <div className="h-8 bg-gray-800 rounded w-64" />
                    <div className="grid md:grid-cols-2 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-40 bg-gray-900 rounded-2xl" />
                        ))}
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                <button
                    onClick={() => navigate(`/admin/leads/${id}`)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white"
                >
                    <ArrowLeft size={18} /> Back
                </button>

                <h1 className="text-3xl font-bold">Edit Lead</h1>

                <div className="grid md:grid-cols-2 gap-6">
                    <StatCard title="Contact Information">
                        <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
                        <Input label="Email Address" name="emailAddress" value={form.emailAddress} onChange={handleChange} />
                        <PhoneBlock value={form.phoneNumber} onChange={(v) => setForm(p => ({ ...p, phoneNumber: v }))} />
                        <Input label="Country" name="country" value={form.country} onChange={handleChange} />
                    </StatCard>

                    <StatCard title="Business Information">
                        <Input label="Business Name" name="businessName" value={form.businessName} onChange={handleChange} />
                        <Input label="Business Email" name="businessEmail" value={form.businessEmail} onChange={handleChange} />

                        <Select
                            label="Business Type"
                            name="businessType"
                            value={form.businessType}
                            onChange={handleChange}
                            options={BUSINESS_TYPES}
                        />

                        <Select
                            label="Lead Status"
                            name="leadStatus"
                            value={form.leadStatus}
                            onChange={handleChange}
                            options={Object.values(LEAD_STATUS).map(status => ({
                                value: status,
                                label: capitalize(status),
                            }))}
                        />

                    </StatCard>

                    <StatCard title="Website">
                        <Select
                            label="Has a Website?"
                            value={form.hasAWebsite ? "yes" : "no"}
                            onChange={(e) =>
                                setForm(p => ({
                                    ...p,
                                    hasAWebsite: e.target.value === "yes",
                                }))
                            }
                            options={["yes", "no"]}
                        />

                        {form.hasAWebsite && (
                            <Input
                                label="Website URL"
                                name="websiteUrl"
                                value={form.websiteUrl}
                                onChange={handleChange}
                                placeholder="https://example.com"
                            />
                        )}
                    </StatCard>

                    <StatCard title="Project">
                        <Input
                            label="Interested Service"
                            name="interestedService"
                            value={form.interestedService}
                            onChange={handleChange}
                        />
                        <Textarea
                            label="Project Description"
                            name="projectDescription"
                            value={form.projectDescription}
                            onChange={handleChange}
                        />
                    </StatCard>
                </div>

                <StatCard title="Internal Notes">
                    <Textarea
                        label="Notes"
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                    />
                </StatCard>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => navigate(`/admin/leads/${id}`)}
                        className="px-6 py-3 bg-gray-800 rounded-xl"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={saving}
                        onClick={handleSave}
                        className="px-8 py-3 bg-white text-black rounded-xl font-semibold"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}

/* ---------- Small UI helpers ---------- */

function StatCard({ title, children }) {
    return (
        <motion.div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <div className="space-y-4">{children}</div>
        </motion.div>
    );
}

function Input({ label, ...props }) {
    return (
        <div>
            <label className="block text-sm mb-1 text-gray-400">{label}</label>
            <input {...props} className="w-full px-4 py-3 bg-gray-800 rounded-xl" />
        </div>
    );
}

function Textarea({ label, ...props }) {
    return (
        <div>
            <label className="block text-sm mb-1 text-gray-400">{label}</label>
            <textarea {...props} rows={5} className="w-full px-4 py-3 bg-gray-800 rounded-xl resize-none" />
        </div>
    );
}

function Select({ label, name, value, onChange, options }) {
    return (
        <div>
            <label className="block text-sm mb-1 text-gray-400">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 bg-gray-800 rounded-xl"
            >
                <option value="">Select</option>
                {options.map(opt => (
                    <option
                        key={typeof opt === "string" ? opt : opt.value}
                        value={typeof opt === "string" ? opt : opt.value}
                    >
                        {typeof opt === "string" ? capitalize(opt) : opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

function PhoneBlock({ value, onChange, country = "ng" }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
            </label>

            <div className="flex items-center h-[56px] bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden focus-within:border-white/30 transition-colors">
                <PhoneInput
                    country={country}
                    value={value}
                    onChange={onChange}
                    className="w-full h-full"
                    inputClassName="!h-full !bg-transparent !border-none !text-white !pl-3 !pr-4 !outline-none !placeholder-gray-400"
                    countrySelectorStyleProps={{
                        buttonClassName:
                            '!h-full !bg-transparent !border-none !px-3 !text-white hover:!bg-white/10',
                        dropdownStyleProps: {
                            className: '!bg-gray-900 !border-gray-700',
                        },
                    }}
                />
            </div>
        </div>
    );
}
