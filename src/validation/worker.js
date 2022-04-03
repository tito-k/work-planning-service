import { check } from "express-validator";

export default {
  createWorkerSchema: [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email address is required.")
      .isEmail()
      .withMessage("Enter a valid email address.")
      .normalizeEmail(),

    check("firstName").not().isEmpty().withMessage("First name is required."),

    check("lastName").not().isEmpty().withMessage("Last name is required."),

    check("phoneNumber")
      .not()
      .isEmpty()
      .withMessage("Phone number is required.")
      .isMobilePhone()
      .withMessage("Enter a valid phone number."),

    check("address").not().isEmpty().withMessage("Address is required."),
  ],
};
