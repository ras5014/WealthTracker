import type { Request, Response } from "express";

export const getAllTransactions = (req: Request, res: Response) => {
  res.send("Get all transactions");
};

export const createTransaction = (req: Request, res: Response) => {
  res.send("Create a new transaction");
};
