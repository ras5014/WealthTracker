import type { Request, Response } from "express";
import { createTransaction } from "../services/transactions.services";

export const getAll = (req: Request, res: Response) => {
  res.send("Get all transactions");
};

export const create = async (req: Request, res: Response) => {
  res.status(201).json({
    message: "Transaction created successfully",
    transaction: await createTransaction(req.body),
  });
};
