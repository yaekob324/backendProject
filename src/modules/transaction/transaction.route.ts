import {updateTransaction} from "./transaction.controller";
import {createTransactionController} from "./transaction.controller";
import {getTransaction} from "./transaction.controller";
import {deleteTransaction} from "./transaction.controller";
import {getAllTransactions} from "./transaction.controller";
import {transactionSchema} from "./transaction.schema";
import {validator} from "../../middleware/validation.middleware";
import {authMiddleware} from "../../middleware/auth.middleware";
import express from "express"; 
import { createTransaction } from "./transaction.repository";

export const transactionRouter = express.Router();
transactionRouter.post("/create",validator(transactionSchema),authMiddleware, createTransactionController);
transactionRouter.get("/get/:transactionId", getTransaction);
transactionRouter.patch("/update/:transactionId", updateTransaction);
transactionRouter.delete("/delete/:transactionId", deleteTransaction);
transactionRouter.get("/get-all", getAllTransactions);