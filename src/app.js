import compression from "compression";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./route/index.js";
import connectToDatabase from "./config/database.js";
import errorHandler from "./middleware/errorHandler.js";

config();

const app = express();

connectToDatabase();

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
if (["development", "production"].includes(process.env.NODE_ENV)) {
  app.use(morgan("dev"));
}

app.use(routes);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to my Work Plan Service API v1.0",
  });
});

app.all("*", (req, res) => {
  res.status(404).json({
    status: "not found",
    message: "Invalid route.",
  });
});

app.use(errorHandler);

export default app;
