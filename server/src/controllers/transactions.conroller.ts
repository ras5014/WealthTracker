import type { Request, Response } from "express";
import {
  createTransaction,
  getAllTransactions,
} from "../services/transactions.services";
import { successResponse, errorResponse } from "../utils/responses";

export const getAll = async (req: Request, res: Response) => {
  const transactions = await getAllTransactions();
  successResponse(
    res,
    transactions,
    200,
    "Transactions retrieved successfully",
  );
};

export const create = async (req: Request, res: Response) => {
  const transaction = await createTransaction(req.body);
  successResponse(res, transaction, 201, "Transaction created successfully");
};
