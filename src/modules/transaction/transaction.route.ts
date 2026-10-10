import {updateTransaction} from "./transaction.controller";
import {createTransaction} from "./transaction.controller";
import {getTransaction} from "./transaction.controller";
import {deleteTransaction} from "./transaction.controller";
import {getAllTransactions} from "./transaction.controller";
import express from "express"; 

export const transactionRouter = express.Router();
transactionRouter.post("/create", createTransaction);
transactionRouter.get("/get/:transactionId", getTransaction);
transactionRouter.patch("/update/:transactionId", updateTransaction);
transactionRouter.delete("/delete/:transactionId", deleteTransaction);
transactionRouter.get("/get-all", getAllTransactions);