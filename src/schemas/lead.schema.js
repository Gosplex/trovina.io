import { LEAD_STATUS, LEAD_PRIORITY } from "../constants/lead.constants";

export const LeadSchema = {
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    businessName: "",
    businessEmail: "",
    businessType: "",
    interestedService: "",
    projectDescription: "",
    hasWebsite: false,
    websiteUrl: "",
    country: "",
    source: "",
    leadStatus: LEAD_STATUS.NEW,
    priority: LEAD_PRIORITY.MEDIUM,
    tags: [],
    assignedTo: null,
    notes: "",
    createdAt: null,
    updatedAt: null,
};
