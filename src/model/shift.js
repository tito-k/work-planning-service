import mongoose from "mongoose";

const { Schema } = mongoose;

const ShiftSchema = new Schema(
  {
    day: {
      type: String,
      required: true,
      enum: [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
    },
    hours: {
      type: Number,
      required: true,
      min: [1, "A minimum of one hour is required."],
      max: [24, "Hours cannot be greater than 24."],
      default: 8,
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

ShiftSchema.pre("save", async function (next) {
  const currentStartTime = new Date();
  const currentEndTime = new Date();

  currentStartTime.setHours(
    this.startTime.split(":")[0],
    this.startTime.split(":")[1],
    0
  );

  currentEndTime.setHours(
    this.endTime.split(":")[0],
    this.endTime.split(":")[1],
    0
  );

  this.startTime = currentStartTime;
  this.endTime = currentEndTime;

  next();
});

ShiftSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.__v;
  },
});

const shift = mongoose.model("Shift", ShiftSchema);
export default shift;
