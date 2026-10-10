import express from "express";
import { authRouter } from "./modules/auth/auth.route";
import { budgetRouter } from "./modules/budget/budget.route";
import { categoryRouter } from "./modules/category/category.route";
import { reportRouter } from "./modules/report/report.route";
import {transactionRouter} from "./modules/transaction/transaction.route";
export const app = express();

app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/v1/budget", budgetRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/report", reportRouter);