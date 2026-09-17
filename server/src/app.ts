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
  console.log("Request received");
  res.status(200).json({ message: "Hello, World!" });
});

app.post("/", (req, res) => {
  console.log("Request body:", req.body);
  res.status(200).json({ message: "POST request received" });
});

// Specify custom middlewares, logging, api routes later

// Transactions routes
import transactionsRouter from "./routes/transactions.route";
app.use("/api/transactions", transactionsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
