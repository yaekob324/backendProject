import { Request, Response } from "express";
import { alterBudget, insertBudget } from "./budget.repository";
import { getBudgets } from "./budget.repository";
import {removeBudget} from "./budget.repository";
import {isChronolical} from "./budget.service";
type budgetParams = {
budgetId: string;
}

export async function updateBudget(req: Request<budgetParams>, res: Response) {
  const budgetId = req.params.budgetId;
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { start_date, end_date } = req.body;
  if(!start_date || !end_date){
    return res.status(400).json({
      message:"you must provide both start_date and end_date or neither of them"
    })
  }else{
    if(!isChronolical(new Date(start_date),new Date(end_date))){
      return res.status(400).json({
        message:"start_date must be before end_date"
      })
    }
  }
  const updatedBudget = await alterBudget(req, budgetId, userId);
  if(!updatedBudget){
    return res.status(404).json({
      message:"Budget not found"
    })
  }
  res.json({ message: "Budget updated successfully", budget: updatedBudget });
}
export async function deleteBudget(req: Request<budgetParams>, res: Response) {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const removed=await removeBudget(req.params.budgetId,userId);
  if(!removed){
    res.status(400).json({
      message:"Budget not found"
    })
  }
  res.status(204).send({ message: "Budget deleted successfully" });
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
  const userId = req.session.userId;
  if(!userId){
    return res.status(401).json({ message: "Unauthorized" });
  }
  const budget = await insertBudget(req,userId);
  
  res.status(201).json({ message: "Budget created successfully", budget });
}