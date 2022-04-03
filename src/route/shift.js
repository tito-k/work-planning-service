import { Router } from "express";
import asyncWrapper from "../middleware/asyncWrapper.js";
import shiftController from "../controller/shift.js";
import schemas from "../validation/shift.js";
import validator from "../middleware/validator.js";

const { createShift, getAllShift, getShift, updateShift, deleteShift } =
  shiftController;

const { createShiftSchema, getShiftShema, updateShiftSchema } = schemas;

const router = Router();

router.post("/", validator(createShiftSchema), asyncWrapper(createShift));

router.get("/", asyncWrapper(getAllShift));

router.get("/:day", validator(getShiftShema), asyncWrapper(getShift));

router.patch("/:day", validator(updateShiftSchema), asyncWrapper(updateShift));

router.delete("/:day", validator(getShiftShema), asyncWrapper(deleteShift));

export default router;
