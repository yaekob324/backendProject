import { Request, Response } from "express";
import { insertBudget } from "./budget.repository";
import { getBudgets } from "./budget.repository";
export function updateBudget(req: Request, res: Response) {
  res.json({ message: "Budget updated successfully" });
}
export function deleteBudget(req: Request, res: Response) {
  res.json({ message: "Budget deleted successfully" });
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