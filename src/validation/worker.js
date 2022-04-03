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

    check("firstName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("First name is required.")
      .isLength({ min: 2, max: 15 })
      .withMessage("First name should be between 2 to 15 characters")
      .isAlpha()
      .withMessage("First name should only contain alphabets"),

    check("middleName")
      .optional()
      .trim()
      .isLength({ min: 2, max: 15 })
      .withMessage("Middle name should be between 2 to 15 characters")
      .isAlpha()
      .withMessage("Middle name should only contain alphabets"),

    check("lastName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Last name is required.")
      .isLength({ min: 2, max: 15 })
      .withMessage("Last name should be between 2 to 15 characters")
      .isAlpha()
      .withMessage("Last name should only contain alphabets"),

    check("phoneNumber")
      .not()
      .isEmpty()
      .withMessage("Phone number is required.")
      .isMobilePhone()
      .withMessage("Enter a valid phone number."),

    check("address").not().isEmpty().withMessage("Address is required."),
  ],

  updateWorkerSchema: [
    check("firstName")
      .optional()
      .trim()
      .isLength({ min: 2, max: 15 })
      .withMessage("First name should be between 2 to 15 characters")
      .isAlpha()
      .withMessage("First name should only contain alphabets"),

    check("middleName")
      .optional()
      .trim()
      .isLength({ min: 2, max: 15 })
      .withMessage("Middle name should be between 2 to 15 characters")
      .isAlpha()
      .withMessage("Middle name should only contain alphabets"),

    check("lastName")
      .optional()
      .trim()
      .isLength({ min: 2, max: 15 })
      .withMessage("Last name should be between 2 to 15 characters")
      .isAlpha()
      .withMessage("Last name should only contain alphabets"),

    check("phoneNumber")
      .optional()
      .isMobilePhone()
      .withMessage("Enter a valid phone number."),
  ],
};
