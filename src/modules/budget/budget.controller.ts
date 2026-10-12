import { Request, Response } from "express";
export function updateBudget(req: Request, res: Response) {
  res.json({ message: "Budget updated successfully" });
}
export function deleteBudget(req: Request, res: Response) {
  res.json({ message: "Budget deleted successfully" });
}
export function getBudget(req: Request, res: Response) {
  res.json({ message: "Budget retrieved successfully" });
}  
export function createBudget(req: Request, res: Response) {
  
}