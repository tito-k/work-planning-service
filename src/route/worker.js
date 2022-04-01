import { Router } from "express";
import asyncWrapper from "../middleware/asyncWrapper.js";
import workerController from "../controller/worker.js";

const { createWorker, getAllWorkers, getWorker, updateWorker, deleteWorker } =
  workerController;

const router = Router();

router.post("/", asyncWrapper(createWorker));

router.get("/", asyncWrapper(getAllWorkers));

router.get("/:id", asyncWrapper(getWorker));

router.patch("/:id", asyncWrapper(updateWorker));

router.delete("/:id", asyncWrapper(deleteWorker));

export default router;
