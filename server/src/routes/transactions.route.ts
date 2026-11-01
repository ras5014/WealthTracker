import { Router } from "express";
import { validateBody } from "../middlewares/validation";
import { getAll, create } from "../controllers/transactions.conroller";
import { transactionSchema } from "shared";

const router = Router();

router.get("/", getAll).post("/", validateBody(transactionSchema), create);

export default router;
