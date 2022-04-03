import { check } from "express-validator";

export default {
  createShiftSchema: [
    check("day")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Day is required.")
      .isIn([
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ])
      .withMessage(
        "Day must be 'sunday' or 'monday' or 'tuesday' or 'wednesday' or 'thursday or 'friday' or 'saturday'."
      ),

    check("hours")
      .optional()
      .isFloat({ min: 1, max: 24 })
      .withMessage("Hours must be between 1 and 24"),

    check("startTime")
      .optional()
      .matches(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/)
      .withMessage("Enter a valid time in 24-Hour format HH:MM:SS."),

    check("endTime")
      .optional()
      .optional()
      .matches(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/)
      .withMessage("Enter a valid time in 24-Hour format HH:MM:SS."),
  ],

  getShiftShema: [
    check("day")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Day is required.")
      .isIn([
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ])
      .withMessage(
        "Day must be 'sunday' or 'monday' or 'tuesday' or 'wednesday' or 'thursday or 'friday' or 'saturday'."
      ),
  ],

  updateShiftSchema: [
    check("day")
      .optional()
      .trim()
      .isIn([
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ])
      .withMessage(
        "Day must be 'sunday' or 'monday' or 'tuesday' or 'wednesday' or 'thursday or 'friday' or 'saturday'."
      ),

    check("hours")
      .optional()
      .isFloat({ min: 1, max: 24 })
      .withMessage("Hours must be between 1 and 24"),

    check("startTime")
      .optional()
      .matches(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/)
      .withMessage("Enter a valid time in 24-Hour format HH:MM:SS."),

    check("endTime")
      .optional()
      .optional()
      .matches(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/)
      .withMessage("Enter a valid time in 24-Hour format HH:MM:SS."),
  ],
};
