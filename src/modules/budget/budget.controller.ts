import { Request, Response } from "express";
import { insertBudget } from "./budget.repository";
export function updateBudget(req: Request, res: Response) {
  res.json({ message: "Budget updated successfully" });
}
export function deleteBudget(req: Request, res: Response) {
  res.json({ message: "Budget deleted successfully" });
}
export function getBudget(req: Request, res: Response) {
  res.json({ message: "Budget retrieved successfully" });
}  
export async function createBudget(req: Request, res: Response) {
  const budget = await insertBudget(req);
  console.log(budget);
  res.json({ message: "Budget created successfully", budget });
}