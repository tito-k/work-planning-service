import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

WorkerSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
  },
});

WorkerSchema.plugin(mongoosePaginate);
const worker = mongoose.model("Worker", WorkerSchema);
export default worker;
