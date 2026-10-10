import {updateBudget} from "./budget.controller";
import {getBudget} from "./budget.controller";
import {createBudget} from "./budget.controller";
import {deleteBudget} from "./budget.controller";
import express from "express";

export const budgetRouter = express.Router();
/* i will consider adding budget id as a url parameter or query string later */
budgetRouter.post("/create", createBudget);
budgetRouter.get("/get", getBudget);
budgetRouter.patch("/update/:budgetId", updateBudget);
budgetRouter.delete("/delete/:budgetId", deleteBudget);