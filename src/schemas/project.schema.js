import {
    PROJECT_STATUS,
    PAYMENT_STATUS,
    PAYMENT_PLAN,
    CURRENCY,
} from "../constants/projectConstants";

export const ProjectSchema = {
    projectTitle: "",
    projectDescription: "",

    projectOwnerId: "",
    projectOwnerSnapshot: {
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
    },

    projectStatus: PROJECT_STATUS.PENDING,

    startDate: null,
    endDate: null,

    totalPrice: 0,
    amountPaid: 0,
    currency: CURRENCY.NGN,
    paymentStatus: PAYMENT_STATUS.PENDING,

    notes: "",

    createdAt: null,
    updatedAt: null,
    createdBy: "",
};
