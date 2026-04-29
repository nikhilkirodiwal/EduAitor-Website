import express from "express";
import {
    bookDemo,
    getAllDemos,
    getDemoById,
    updateDemoStatus,
    deleteDemo,
    getDemoStats,
} from "../controllers/demoController.js";

const router = express.Router();

// ── Public ────────────────────────────────────────────────────
router.post("/book", bookDemo);

// ── Admin (add your auth middleware here when ready) ──────────
// import { protect } from "../middlewares/auth.js";
// router.use(protect);

router.get("/stats", getDemoStats);
router.get("/", getAllDemos);
router.get("/:id", getDemoById);
router.patch("/:id/status", updateDemoStatus);
router.delete("/:id", deleteDemo);

export default router;