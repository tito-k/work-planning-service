import mongoose from "mongoose";
import { config } from "dotenv";
import debug from "debug";

config();

const DEBUG = debug("dev");

const connectToDatabase = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    DEBUG(`Connected to database.`);
  } catch (error) {
    DEBUG(`Could not connect to database ${error}`);
  }
};

export default connectToDatabase;
