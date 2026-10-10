import {monthlyReport} from "./report.controller";
import {categorySpendingReport} from "./report.controller";
import express from "express";

export const reportRouter = express.Router();
reportRouter.get("/monthly-report", monthlyReport);
reportRouter.get("/category-spending", categorySpendingReport);