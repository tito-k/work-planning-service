import { Router } from "express";
import shift from "./shift.js";
import worker from "./worker.js";
import assignedShift from "./assignedShift.js";

const router = Router();

router.use("/shift", shift);
router.use("/worker", worker);
router.use("/assign-shift", assignedShift);

export default router;
