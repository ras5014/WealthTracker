import express from "express";
import helmet from "helmet";
import cors from "cors";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

const app = express();
app.use(helmet());
// If CORS_ORIGIN is set in your environment, allow that origin otherwise allow *, meaning any origin
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, World!" });
});

// Specify custom middlewares, logging, api routes later

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
