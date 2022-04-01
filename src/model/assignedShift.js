import mongoose from "mongoose";

const { Schema } = mongoose;

const AssignedShiftSchema = new Schema(
  {
    worker: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Worker",
    },
    shift: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Worker",
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const assignedShift = mongoose.model("AssignedShift", AssignedShiftSchema);
export default assignedShift;
