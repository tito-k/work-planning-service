import { Worker } from "../model/index.js";

export default {
  createWorker: async (request, response) => {
    const { email, firstName, middleName, lastName, phoneNumber, address } =
      request.body;

    const checkEmail = await Worker.findOne({ email });

    if (checkEmail) {
      return response.status(409).json({
        status: "conflict",
        message: "Worker with email already exist.",
      });
    }

    const checkPhoneNumber = await Worker.findOne({ phoneNumber });

    if (checkPhoneNumber) {
      return response.status(409).json({
        status: "conflict",
        message: "Worker with phone number already exist.",
      });
    }

    const worker = await Worker.create({
      email,
      firstName,
      middleName,
      lastName,
      phoneNumber,
      address,
    });

    return response.status(201).json({
      status: "created",
      message: "Worker created successfully.",
      data: worker,
    });
  },

  getAllWorkers: async (request, response) => {
    const limit = request.query.limit ? Number(request.query.limit) : 15;
    const offset = request.query.offset ? Number(request.query.offset) : 0;

    const workers = await Worker.paginate(
      {},
      { limit, offset, sort: { createdAt: -1 } }
    );

    return response.status(200).json({
      status: "ok",
      data: {
        result: workers.docs,
        totalCount: workers.totalDocs,
      },
    });
  },

  getWorker: async (request, response) => {
    const { id } = request.params;

    const worker = await Worker.findOne({ _id: id });

    if (!worker) {
      return response.status(404).json({
        status: "not found",
        message: "Worker not found.",
      });
    }

    return response.status(200).json({
      status: "ok",
      data: worker,
    });
  },

  updateWorker: async (request, response) => {
    const { id } = request.params;

    const worker = await Worker.findOneAndUpdate(
      { _id: id },
      { $set: request.body },
      { new: true }
    );

    if (!worker) {
      return response.status(404).json({
        status: "not found",
        message: "Worker not found.",
      });
    }

    return response.status(200).json({
      status: "ok",
      message: "Worker updated successfully.",
      data: worker,
    });
  },

  deleteWorker: async (request, response) => {
    const { id } = request.params;

    const worker = await Worker.findOneAndRemove({ _id: id });

    if (!worker) {
      return response.status(404).json({
        status: "not found",
        message: "Worker not found.",
      });
    }

    return response.status(200).json({
      status: "ok",
      message: "Worker deleted successfully.",
    });
  },
};
