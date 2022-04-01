import { Router } from "express";
import shift from "./shift.js";
import worker from "./worker.js";

const router = Router();

router.use("/shift", shift);
router.use("/worker", worker);

export default router;
