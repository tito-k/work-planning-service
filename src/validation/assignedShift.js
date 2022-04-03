import { check } from "express-validator";

export default {
  assignShiftSchema: [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email address is required.")
      .isEmail()
      .withMessage("Enter a valid email address.")
      .normalizeEmail(),

    check("date")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Date is required.")
      .isDate()
      .withMessage("Enter a valid date in format YYYY-MM-DD."),
  ],
};
