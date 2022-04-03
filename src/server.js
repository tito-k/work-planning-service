import Q from "q";
import app from "./app.js";
import debug from "debug";
import http from "http";

const DEBUG = debug("dev");
const PORT = process.env.NODE_ENV === "test" ? 3521 : process.env.PORT || 3000;

Q.stopUnhandledRejectionTracking();

process.on("uncaughtException", (error) => {
  DEBUG(`uncaught exception: ${error.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  DEBUG(`unhandled rejection at ${promise} reason: ${reason}`);
  process.exit(1);
});

const server = http.createServer(app);

server.listen(PORT, () => {
  DEBUG(
    `server running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode.\npress CTRL-C to stop`
  );
});
