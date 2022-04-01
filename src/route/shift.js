import { Router } from "express";
import asyncWrapper from "../middleware/asyncWrapper.js";
import shiftController from "../controller/shift.js";

const { createShift, getAllShift, getShift, updateShift, deleteShift } =
  shiftController;

const router = Router();

router.post("/", asyncWrapper(createShift));

router.get("/", asyncWrapper(getAllShift));

router.get("/:day", asyncWrapper(getShift));

router.patch("/:day", asyncWrapper(updateShift));

router.delete("/:day", asyncWrapper(deleteShift));

export default router;
