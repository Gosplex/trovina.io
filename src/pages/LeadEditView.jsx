import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowLeft, Phone, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import AdminLayout from "../components/AdminLayout";
import { db } from "../lib/firebase";

export default function LeadEditView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lead, setLead] = useState(null);
    const [collectionName, setCollectionName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        businessName: "",
        fullName: "",
        email: "",
        phone: "",
        businessType: "",
        hasWebsite: "No",
        websiteUrl: "",
        leadStatus: "new",          // Lead progress: new → contacted → completed
        paymentStatus: "pending",   // Payment: pending → partial → paid → etc.
        country: "NG",
        amountPaid: 0,
        datePaid: "",
        notes: "",
    });

    useEffect(() => {
        const fetchLead = async () => {
            try {
                setLoading(true);

                let docRef = doc(db, "leads", id);
                let docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCollectionName("leads");
                } else {
                    docRef = doc(db, "free_website_promo", id);
                    docSnap = await getDoc(docRef);
                    if (docSnap.exists()) setCollectionName("free_website_promo");
                }

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setLead(data);
                    setForm({
                        businessName: data.businessName || "",
                        fullName: data.fullName || data.name || "",
                        email: data.email || "",
                        phone: data.phone || "",
                        businessType: data.businessType || "",
                        hasWebsite: data.hasWebsite || "No",
                        websiteUrl: data.websiteUrl || "",
                        leadStatus: data.status || data.leadStatus || "new",
                        paymentStatus: data.paymentStatus || "pending",
                        country: data.country || "NG",
                        amountPaid: data.amountPaid || 0,
                        datePaid: data.datePaid || "",
                        notes: data.notes || "",
                    });
                }
            } catch (err) {
                console.error("Error fetching lead:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchLead();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handlePhoneChange = (phone) => {
        setForm((prev) => ({ ...prev, phone }));
        if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
        if (!form.phone.trim()) newErrors.phone = "Phone number is required";
        if (form.amountPaid < 0) newErrors.amountPaid = "Amount cannot be negative";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm() || !collectionName) return;

        setSaving(true);
        try {
            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, {
                businessName: form.businessName,
                fullName: form.fullName,
                email: form.email,
                phone: form.phone,
                businessType: form.businessType,
                hasWebsite: form.hasWebsite,
                websiteUrl: form.hasWebsite === "Yes" ? form.websiteUrl : "",
                status: form.leadStatus,           // old field for backward compatibility
                leadStatus: form.leadStatus,
                paymentStatus: form.paymentStatus,
                country: form.country,
                amountPaid: Number(form.amountPaid),
                datePaid: form.datePaid || null,
                notes: form.notes,
                updatedAt: serverTimestamp(),
            });

            navigate(`/admin/leads/${id}`);
        } catch (err) {
            console.error("Failed to update lead:", err);
            setErrors({ general: "Failed to save. Please try again." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-8">
                    <div className="animate-pulse space-y-8">
                        <div className="h-8 bg-gray-800 rounded w-64" />
                        <div className="grid md:grid-cols-2 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-40" />
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

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate(`/admin/leads/${id}`)}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Lead
                    </button>
                    <h1 className="text-3xl font-bold text-white">Edit Lead</h1>
                </div>

                {/* Form Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <StatCard title="Basic Information">
                        <InputField
                            label="Business Name"
                            name="businessName"
                            value={form.businessName}
                            onChange={handleChange}
                            error={errors.businessName}
                        />
                        <InputField
                            label="Full Name"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                            error={errors.fullName}
                        />
                        <DropdownField
                            label="Lead Status"
                            name="leadStatus"
                            value={form.leadStatus}
                            onChange={handleChange}
                            options={[
                                { value: "new", label: "New" },
                                { value: "contacted", label: "Contacted" },
                                { value: "completed", label: "Completed" },
                            ]}
                        />
                    </StatCard>

                    {/* Contact Info */}
                    <StatCard title="Contact Information">
                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            error={errors.email}
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Phone Number <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <PhoneInput
                                    country={form.country.toLowerCase()}
                                    value={form.phone}
                                    onChange={handlePhoneChange}
                                    inputClassName="w-full !h-[56px] !bg-gray-800 !border !border-gray-700 !rounded-xl !px-4 !text-white !outline-none focus:!border-white/30"
                                    countrySelectorStyleProps={{
                                        buttonClassName: "!bg-gray-800 !border !border-gray-700 !h-[56px] !rounded-l-xl !px-4",
                                    }}
                                />
                                {errors.phone && (
                                    <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>
                        </div>
                        <DropdownField
                            label="Country"
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            options={[
                                { value: "NG", label: "Nigeria" },
                                { value: "GH", label: "Ghana" },
                                { value: "KE", label: "Kenya" },
                                { value: "ZA", label: "South Africa" },
                                { value: "US", label: "United States" },
                                { value: "GB", label: "United Kingdom" },
                            ]}
                        />
                    </StatCard>

                    {/* Business Details */}
                    <StatCard title="Business Details">
                        <InputField
                            label="Business Type"
                            name="businessType"
                            value={form.businessType}
                            onChange={handleChange}
                        />
                        <DropdownField
                            label="Has Website?"
                            name="hasWebsite"
                            value={form.hasWebsite}
                            onChange={handleChange}
                            options={[
                                { value: "No", label: "No" },
                                { value: "Yes", label: "Yes" },
                            ]}
                        />
                        {form.hasWebsite === "Yes" && (
                            <InputField
                                label="Website URL"
                                name="websiteUrl"
                                value={form.websiteUrl}
                                onChange={handleChange}
                                placeholder="https://example.com"
                            />
                        )}
                    </StatCard>

                    {/* Payment Details */}
                    <StatCard title="Payment Details">
                        <DropdownField
                            label="Payment Status"
                            name="paymentStatus"
                            value={form.paymentStatus}
                            onChange={handleChange}
                            options={[
                                { value: "pending", label: "Pending" },
                                { value: "partial", label: "Partial Payment" },
                                { value: "paid", label: "Fully Paid" },
                                { value: "refunded", label: "Refunded" },
                                { value: "waived", label: "Waived" },
                            ]}
                        />

                        {/* Visual Payment Indicator */}
                        <div className="my-6 p-5 bg-gray-800/50 border border-gray-700 rounded-xl">
                            <div className="flex items-center gap-4">
                                {form.paymentStatus === "paid" || form.paymentStatus === "waived" ? (
                                    <>
                                        <CheckCircle className="w-7 h-7 text-green-400" />
                                        <div>
                                            <p className="font-bold text-green-400 text-lg">
                                                {form.paymentStatus === "paid" ? "Fully Paid" : "Payment Waived"}
                                            </p>
                                        </div>
                                    </>
                                ) : form.paymentStatus === "partial" ? (
                                    <>
                                        <AlertCircle className="w-7 h-7 text-yellow-400" />
                                        <div>
                                            <p className="font-bold text-yellow-400 text-lg">Partial Payment</p>
                                        </div>
                                    </>
                                ) : form.paymentStatus === "refunded" ? (
                                    <>
                                        <XCircle className="w-7 h-7 text-red-400" />
                                        <div>
                                            <p className="font-bold text-red-400 text-lg">Refunded</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="w-7 h-7 text-red-400" />
                                        <div>
                                            <p className="font-bold text-red-400 text-lg">Payment Pending</p>
                                        </div>
                                    </>
                                )}
                            </div>
                            {form.amountPaid > 0 && (
                                <p className="text-sm text-gray-400 mt-3">
                                    Amount recorded: ₦{Number(form.amountPaid).toLocaleString()}
                                </p>
                            )}
                        </div>

                        <InputField
                            label="Amount Paid (₦)"
                            name="amountPaid"
                            type="number"
                            min="0"
                            value={form.amountPaid}
                            onChange={handleChange}
                            placeholder="0"
                            error={errors.amountPaid}
                        />
                        <InputField
                            label="Date Paid"
                            name="datePaid"
                            type="date"
                            value={form.datePaid}
                            onChange={handleChange}
                        />
                    </StatCard>
                </div>

                {/* Notes - Full Width */}
                <StatCard title="Notes & Follow-ups">
                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        rows="8"
                        className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-white/30 resize-none placeholder:text-gray-500"
                        placeholder="Internal notes, follow-up tasks, promises made, etc..."
                    />
                </StatCard>

                {/* General Error */}
                {errors.general && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400">
                        {errors.general}
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => navigate(`/admin/leads/${id}`)}
                        className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-medium transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-8 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}

/* ======================= COMPONENTS ======================= */

function StatCard({ title, children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
        >
            <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>
            <div className="space-y-5">{children}</div>
        </motion.div>
    );
}

function InputField({ label, name, type = "text", value, onChange, placeholder, required = false, error }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-5 py-4 bg-gray-800 border rounded-xl focus:outline-none transition placeholder:text-gray-500 ${error ? "border-red-500/50" : "border-gray-700 focus:border-white/30"
                    }`}
            />
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
    );
}

function DropdownField({ label, name, value, onChange, options }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-white/30 transition"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}