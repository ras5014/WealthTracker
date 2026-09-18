import { Router } from "express";
import { transactionInsertSchema } from "../db/schema";
import { validateBody } from "../middlewares/validation";

const router = Router();

import { getAll, create } from "../controllers/transactions.conroller";

router
  .get("/", getAll)
  .post("/", validateBody(transactionInsertSchema), create);

export default router;
