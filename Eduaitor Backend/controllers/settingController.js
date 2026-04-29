import Setting from "../models/setting.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";

/* Singleton */
const getSetting = async () => {
    let s = await Setting.findOne();
    if (!s) s = await Setting.create({});
    return s;
};

/* GET */
export const getSettings = async (req, res) => {
    try {
        const setting = await getSetting();
        const obj = setting.toObject();

        obj.general.logoUrl = obj.general.logo?.url || "";
        obj.general.faviconUrl = obj.general.favicon?.url || "";

        res.json(obj);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch settings" });
    }
};

/* UPDATE */
export const updateSettings = async (req, res) => {
    try {
        const setting = await getSetting();

        let parsed = {};
        try {
            parsed = JSON.parse(req.body.data || "{}");
        } catch {
            return res.status(400).json({ message: "Invalid payload" });
        }

        const { general = {}, policies = {} } = parsed;
        const files = req.files || {};

        /* LOGO */
        if (files.logo) {
            if (setting.general?.logo?.publicId) {
                await deleteFromCloudinary(setting.general.logo.publicId);
            }
            const r = await uploadToCloudinary(files.logo[0], "settings");
            general.logo = { url: r.url, publicId: r.public_id };
        } else if (general.logoUrl === "") {
            general.logo = { url: "", publicId: "" };
        }

        /* FAVICON */
        if (files.favicon) {
            if (setting.general?.favicon?.publicId) {
                await deleteFromCloudinary(setting.general.favicon.publicId);
            }
            const r = await uploadToCloudinary(files.favicon[0], "settings");
            general.favicon = { url: r.url, publicId: r.public_id };
        } else if (general.faviconUrl === "") {
            general.favicon = { url: "", publicId: "" };
        }

        delete general.logoUrl;
        delete general.faviconUrl;

        const updated = await Setting.findByIdAndUpdate(
            setting._id,
            {
                $set: {
                    general: { ...setting.general.toObject(), ...general },
                    policies: { ...setting.policies.toObject(), ...policies },
                },
            },
            { new: true, runValidators: true }
        );

        const obj = updated.toObject();
        obj.general.logoUrl = obj.general.logo?.url || "";
        obj.general.faviconUrl = obj.general.favicon?.url || "";

        res.json(obj);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update settings" });
    }
};