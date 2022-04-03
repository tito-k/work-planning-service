import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
      ref: "Shift",
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

AssignedShiftSchema.pre("save", async function (next) {
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

AssignedShiftSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    let startTime = ret.startTime;
    let endTime = ret.endTime;
    let date = ret.date;

    delete ret.shift;
    delete ret.startTime;
    delete ret.endTime;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;

    ret.startTime = new Date(startTime).toLocaleTimeString();
    ret.endTime = new Date(endTime).toLocaleTimeString();
    ret.date = new Date(date).toLocaleDateString("sv-SE");
  },
});

AssignedShiftSchema.plugin(mongoosePaginate);
const assignedShift = mongoose.model("AssignedShift", AssignedShiftSchema);
export default assignedShift;
