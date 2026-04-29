import mongoose from "mongoose";

const demoSchema = new mongoose.Schema(
    {
        // Institution Details
        instName: { type: String, required: true, trim: true },
        instType: { type: String, required: true, enum: ["school", "college", "coaching", "university"] },
        students: { type: String, default: "" },
        branches: { type: String, default: "" },

        // Contact Person
        contactName: { type: String, required: true, trim: true },
        designation: { type: String, default: "" },
        email: { type: String, required: true, lowercase: true, trim: true },
        phone: { type: String, required: true, trim: true },
        city: { type: String, default: "" },

        // Demo Preferences
        date: { type: String, default: "" },   // kept as string (YYYY-MM-DD from input)
        time: { type: String, default: "" },
        mode: { type: String, default: "zoom", enum: ["zoom", "meet", "inperson"] },
        message: { type: String, default: "" },

        // Admin tracking
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "confirmed", "completed", "cancelled"],
        },
        adminNotes: { type: String, default: "" },
    },
    { timestamps: true }
);

const Demo = mongoose.model("Demo", demoSchema);
export default Demo;