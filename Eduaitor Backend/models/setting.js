import mongoose from "mongoose";

/* ── Reusable ── */
const linkSchema = new mongoose.Schema(
    { label: String, path: String },
    { _id: false }
);

const policySectionSchema = new mongoose.Schema(
    { heading: String, content: String },
    { _id: false }
);

const policySchema = new mongoose.Schema(
    {
        enabled: { type: Boolean, default: true },
        title: String,
        slug: String,
        lastUpdated: String,
        sections: { type: [policySectionSchema], default: [] },
    },
    { _id: false }
);

const imageField = {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
};

/* ── MAIN ── */
const settingSchema = new mongoose.Schema(
    {
        /* GENERAL */
        general: {
            siteName: String,
            tagline: String,
            description: String,

            logo: imageField,
            favicon: imageField,

            emails: { type: [String], default: [] },
            phones: { type: [String], default: [] },
            address: String,
            
            instagram: String,
            linkedin: String,
            facebook: String,
            twitter: String,

            showAppDownload: { type: Boolean, default: true },
            googlePlayUrl: String,
            appStoreUrl: String,

            copyright: String,
        },

        /* POLICIES */
        policies: {
            termsOfUse: policySchema,
            privacyPolicy: policySchema,
            helpSupport: policySchema,
            faqs: policySchema,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);