import { Request, Response } from "express";
import { alterBudget, insertBudget } from "./budget.repository";
import { getBudgets } from "./budget.repository";
import {removeBudget} from "./budget.repository";
type budgetParams = {
budgetId: string;
}

export async function updateBudget(req: Request<budgetParams>, res: Response) {
  const budgetId = req.params.budgetId;
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const updatedBudget = await alterBudget(req, budgetId, userId);
  res.json({ message: "Budget updated successfully", budget: updatedBudget });
}
export async function deleteBudget(req: Request<budgetParams>, res: Response) {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  await removeBudget(req.params.budgetId,userId);
  res.status(201).send({ message: "Budget deleted successfully" });
}
export async function getBudgetsController(req: Request, res: Response) {
  const userId = req.session.userId;
  if(!userId){
    return res.status(401).json({ message: "Unauthorized" });
  }
  const budgets = await getBudgets(userId);
  res.json({ message: "Budgets retrieved successfully", budgets });
}  
export async function createBudget(req: Request, res: Response) {
  const budget = await insertBudget(req);
  console.log(budget);
  res.json({ message: "Budget created successfully", budget });
}