import { Router } from "express";
import asyncWrapper from "../middleware/asyncWrapper.js";
import assignedShiftController from "../controller/assignedShift.js";
import schemas from "../validation/assignedShift.js";
import validator from "../middleware/validator.js";

const {
  assignShift,
  getAllAssignedShift,
  getOneAssignedShift,
  getOneWorkerAssignedShift,
} = assignedShiftController;

const { assignShiftSchema } = schemas;

const router = Router();

router.post("/", validator(assignShiftSchema), asyncWrapper(assignShift));

router.get("/", getAllAssignedShift);

router.get("/:id", getOneAssignedShift);

router.get("/worker/:email", getOneWorkerAssignedShift);

export default router;
