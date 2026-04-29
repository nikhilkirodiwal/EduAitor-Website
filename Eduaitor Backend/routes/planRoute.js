import express from "express";
import {
    getPlans,
    getPlanById,
    createPlan,
    updatePlan,
    togglePlan,
    deletePlan,
} from "../controllers/planController.js";

const router = express.Router();

router.get("/", getPlans);
router.post("/", createPlan);
router.get("/:id", getPlanById);
router.put("/:id", updatePlan);
router.patch("/:id/toggle", togglePlan);
router.delete("/:id", deletePlan);

export default router;