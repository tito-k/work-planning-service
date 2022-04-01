import mongoose from "mongoose";

const { Schema } = mongoose;

const WorkerSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      match: [/\S+@\S+\.\S+/, "A valid email is required."],
      lowercase: true,
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const worker = mongoose.model("Worker", WorkerSchema);
export default worker;
