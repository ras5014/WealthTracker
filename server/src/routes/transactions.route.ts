import { Router } from "express";

const router = Router();

import {
  getAllTransactions,
  createTransaction,
} from "../controllers/transactions.conroller";

router.get("/", getAllTransactions);
router.post("/", createTransaction);

export default router;
