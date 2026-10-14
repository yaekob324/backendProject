import {updateTransaction} from "./transaction.controller";
import {createTransactionController} from "./transaction.controller";
import {getTransaction} from "./transaction.controller";
import {deleteTransaction} from "./transaction.controller";
import {getAllTransactions} from "./transaction.controller";
import {transactionParamsSchema, transactionSchema, transactionUpdateSchema} from "./transaction.schema";
import {paramsValidator} from "../../middleware/validation.middleware";
import {validator} from "../../middleware/validation.middleware";
import {authMiddleware} from "../../middleware/auth.middleware";
import express from "express"; 

export const transactionRouter = express.Router();
transactionRouter.post("/create", authMiddleware, validator(transactionSchema), createTransactionController);
transactionRouter.get("/get/:transactionId", authMiddleware, paramsValidator(transactionParamsSchema), getTransaction);
transactionRouter.patch(
  "/update/:transactionId",
  authMiddleware,
  paramsValidator(transactionParamsSchema),
  validator(transactionUpdateSchema),
  updateTransaction
);
transactionRouter.delete(
  "/delete/:transactionId",
  authMiddleware,
  paramsValidator(transactionParamsSchema),
  deleteTransaction
);
transactionRouter.get("/get-all", authMiddleware, getAllTransactions);