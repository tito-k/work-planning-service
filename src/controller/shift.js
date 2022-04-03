import { Shift } from "../model/index.js";

export default {
  createShift: async (request, response) => {
    const { day, hours, startTime, endTime } = request.body;

    const findDay = await Shift.findOne({ day });

    if (findDay) {
      return response.status(409).json({
        status: "conflict",
        message:
          "A shift has already been created for this day. Please use the update route to edit it.",
      });
    }

    const currentStartTime = new Date();
    const currentEndTime = new Date();

    currentStartTime.setHours(
      startTime.split(":")[0],
      startTime.split(":")[1],
      0
    );

    currentEndTime.setHours(endTime.split(":")[0], endTime.split(":")[1], 0);

    if (currentStartTime >= currentEndTime) {
      return response.status(409).json({
        status: "conflict",
        message: "End time cannot be less than or equal to start time.",
      });
    }

    await Shift.create({ day, hours, startTime, endTime }).then((shift) => {
      return response.status(201).json({
        status: "created",
        message: "Shift created successfully.",
        data: shift,
      });
    });
  },

  getAllShift: async (request, response) => {
    const shifts = await Shift.find();

    return response.status(200).json({
      status: "ok",
      data: shifts,
    });
  },

  getShift: async (request, response) => {
    const { day } = request.params;

    const shift = await Shift.findOne({ day });

    if (!shift) {
      return response.status(404).json({
        status: "not found",
        mesage: "Shift not found.",
      });
    }

    return response.status(200).json({
      status: "ok",
      data: shift,
    });
  },

  updateShift: async (request, response) => {
    const { day } = request.params;

    const shift = await Shift.findOneAndUpdate(
      {
        day,
      },
      {
        $set: request.body,
      },
      {
        new: true,
      }
    );

    if (!shift) {
      return response.status(404).json({
        status: "not found",
        mesage: "Shift not found.",
      });
    }

    return response.status(200).json({
      status: "ok",
      message: "Shift updated successfully.",
      data: shift,
    });
  },

  deleteShift: async (request, response) => {
    const { day } = request.params;

    const shift = await Shift.findOneAndRemove({ day });

    if (!shift) {
      return response.status(404).json({
        status: "not found",
        mesage: "Shift not found.",
      });
    }

    return response.status(200).json({
      status: "ok",
      message: "Shift deleted successfully.",
    });
  },
};
