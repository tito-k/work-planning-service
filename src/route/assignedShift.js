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

const {
  assignShiftSchema,
  getAssignedShiftSchema,
  getWorkerAssignedShiftSchema,
} = schemas;

const router = Router();

router.post("/", validator(assignShiftSchema), asyncWrapper(assignShift));

router.get("/", validator(getAssignedShiftSchema), getAllAssignedShift);

router.get("/:id", getOneAssignedShift);

router.get(
  "/worker/:email",
  validator(getWorkerAssignedShiftSchema),
  getOneWorkerAssignedShift
);

export default router;
