import { Router } from "express";
import asyncWrapper from "../middleware/asyncWrapper.js";
import workerController from "../controller/worker.js";
import schemas from "../validation/worker.js";
import validator from "../middleware/validator.js";

const { createWorker, getAllWorkers, getWorker, updateWorker, deleteWorker } =
  workerController;

const { createWorkerSchema } = schemas;

const router = Router();

router.post("/", validator(createWorkerSchema), asyncWrapper(createWorker));

router.get("/", asyncWrapper(getAllWorkers));

router.get("/:id", asyncWrapper(getWorker));

router.patch("/:id", asyncWrapper(updateWorker));

router.delete("/:id", asyncWrapper(deleteWorker));

export default router;
