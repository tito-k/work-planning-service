import { Shift, Worker, AssignedShift } from "../model/index.js";
import asyncForEach from "../helper/asyncForEach.js";

export default {
  assignShift: async (request, response) => {
    const { email, date } = request.body;

    const worker = await Worker.findOne({ email });

    if (!worker) {
      return response.status(400).json({
        status: "bad request",
        message: "Worker email address is invalid.",
      });
    }

    const selectedDate = `${new Date(date).getFullYear()}-0${
      new Date(date).getMonth() + 1
    }-0${new Date(date).getDate()}`;

    const currentDate = `${new Date().getFullYear()}-0${
      new Date().getMonth() + 1
    }-0${new Date().getDate()}`;

    if (selectedDate < currentDate) {
      return response.status(400).json({
        status: "bad request",
        mesage: "You can only assign shifts for current and future dates.",
      });
    }

    const weekday = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    const day = weekday[new Date(date).getDay()];

    const shift = await Shift.findOne({ day });

    if (!shift) {
      return response.status(404).json({
        status: "not found",
        message: "There are no available shifts for this date.",
      });
    }

    const checkShift = await AssignedShift.findOne({
      worker: worker._id,
      shift: shift._id,
      date: date,
    });

    if (checkShift) {
      return response.status(409).json({
        status: "conflict",
        message: "Worker has already been assigned to a task for this date.",
      });
    }

    const assignedShiftForDate = await AssignedShift.find({ date });

    const addHoursToTime = async (fullDateAndTime, hours) => {
      const dateAndTime = new Date(fullDateAndTime);
      dateAndTime.setHours(dateAndTime.getHours() + hours);
      return dateAndTime;
    };

    const availableStartTime = [];
    const availableEndTime = [];
    const assignedStartTime = [];
    const assignedEndTime = [];

    let startTime = new Date(shift.startTime);
    let endTime = new Date(shift.endTime);

    while (startTime <= endTime) {
      const newEndTime = await addHoursToTime(startTime, shift.hours);
      const newShiftStartTime = startTime.toLocaleTimeString();
      availableStartTime.push(newShiftStartTime);
      const newShiftEndTime = newEndTime.toLocaleTimeString();
      availableEndTime.push(newShiftEndTime);
      startTime = await addHoursToTime(startTime, shift.hours);
      if (startTime >= endTime) {
        break;
      }
    }

    if (assignedShiftForDate) {
      await asyncForEach(assignedShiftForDate, async (assignedShift) => {
        assignedStartTime.push(assignedShift.startTime);
        assignedEndTime.push(assignedShift.endTime);
      });
    }

    if (availableStartTime) {
      for (let x in availableStartTime) {
        const getSplitDate = date.split("-");
        const getSplitTime = availableStartTime[x].split(":");
        const dateAndStartTime = new Date(
          getSplitDate[0],
          getSplitDate[1] - 1,
          getSplitDate[2],
          getSplitTime[0],
          getSplitTime[1],
          getSplitTime[2]
        );

        if (dateAndStartTime <= new Date()) {
          const dateAndEndTime = await addHoursToTime(
            dateAndStartTime,
            shift.hours
          );
          assignedStartTime.push(dateAndStartTime.toLocaleTimeString());
          assignedEndTime.push(dateAndEndTime.toLocaleTimeString());
        }
      }
    }

    const availableToAssignStartTime = availableStartTime.filter(
      (x) => !assignedStartTime.includes(x)
    );

    const availableToAssignEndTime = availableEndTime.filter(
      (x) => !assignedEndTime.includes(x)
    );

    if (
      availableToAssignStartTime.length === 0 &&
      availableToAssignEndTime.length === 0
    ) {
      return response.status(404).json({
        status: "not found",
        message: "There is no available shift for this date.",
      });
    }

    AssignedShift.create({
      worker: worker._id,
      shift: shift._id,
      date: date,
      startTime: availableStartTime[0],
      endTime: availableEndTime[0],
    }).then((shift) => {
      return response.status(200).json({
        status: "ok",
        message: "Successfully assigned shift to worker",
        data: shift,
      });
    });
  },

  getAllAssignedShift: async (request, response) => {
    const { date } = request.query;

    const shiftToFind = {};

    if (date) {
      shiftToFind.date = date;
    }

    const assignedShifts = await AssignedShift.find(shiftToFind);

    return response.status(200).json({
      status: "ok",
      data: assignedShifts,
    });
  },

  getOneAssignedShift: async (request, response) => {
    const { id } = request.params;

    const assignedShift = await AssignedShift.findOne({ _id: id });

    if (!assignedShift) {
      return response.status(404).json({
        status: "not found",
        message: "Assigned shift not found.",
      });
    }

    return response.status(200).json({
      status: "ok",
      data: assignedShift,
    });
  },

  getOneWorkerAssignedShift: async (request, response) => {
    const { email } = request.params;
    const { date } = request.query;

    const worker = await Worker.findOne({ email });

    if (!worker) {
      return response.status(400).json({
        status: "bad request",
        message: "Worker email address is invalid.",
      });
    }

    const shiftToFind = {
      worker: worker._id,
    };

    if (date) {
      shiftToFind.date = date;
    }

    const workerAssignedShifts = await AssignedShift.find(shiftToFind);

    return response.status(200).json({
      status: "ok",
      data: workerAssignedShifts,
    });
  },
};
