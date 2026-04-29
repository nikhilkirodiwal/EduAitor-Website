import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Plan name is required"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"],
        },
        duration: {
            type: String,
            enum: ["monthly", "quarterly", "yearly", "lifetime"],
            default: "monthly",
        },
        badge: {
            type: String,
            default: "",
            trim: true,
        },
        badgeColor: {
            type: String,
            default: "#6366f1",
        },
        ctaText: {
            type: String,
            default: "Get Started",
            trim: true,
        },
        features: {
            type: [String],
            default: [],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Index for sorting by order then creation date
planSchema.index({ order: 1, createdAt: 1 });

const Plan = mongoose.model("Plan", planSchema);

export default Plan;