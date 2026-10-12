import { Request, Response } from "express";
import { alterBudget, insertBudget } from "./budget.repository";
import { getBudgets } from "./budget.repository";
import {removeBudget} from "./budget.repository";
import {isChronolical} from "./budget.service";
import { AppError } from "../../middleware/error.middleware";
type budgetParams = {
budgetId: string;
}

export async function updateBudget(req: Request<budgetParams>, res: Response) {
  const budgetId = req.params.budgetId;
  const userId = req.session.userId;
  if (!userId) {
    throw new AppError(401, "Unauthorized");
  }
  const { start_date, end_date } = req.body;
  if(!start_date || !end_date){
    throw new AppError(
      400,
      "You must provide both start_date and end_date or neither of them"
    );
  }else{
    if(!isChronolical(new Date(start_date),new Date(end_date))){
      throw new AppError(400, "start_date must be before end_date");
    }
  }
  const updatedBudget = await alterBudget(req, budgetId, userId);
  if(!updatedBudget){
    throw new AppError(404, "Budget not found");
  }
  res.json({ message: "Budget updated successfully", budget: updatedBudget });
}
export async function deleteBudget(req: Request<budgetParams>, res: Response) {
  const userId = req.session.userId;
  if (!userId) {
    throw new AppError(401, "Unauthorized");
  }
  const removed=await removeBudget(req.params.budgetId,userId);
  if(!removed){
    throw new AppError(404, "Budget not found");
  }
  return res.status(204).send();
}
export async function getBudgetsController(req: Request, res: Response) {
  const userId = req.session.userId;
  if(!userId){
    throw new AppError(401, "Unauthorized");
  }
  const budgets = await getBudgets(userId);
  res.json({ message: "Budgets retrieved successfully", budgets });
}  
export async function createBudget(req: Request, res: Response) {
  const userId = req.session.userId;
  if(!userId){
    throw new AppError(401, "Unauthorized");
  }
  const budget = await insertBudget(req,userId);
  
  res.status(201).json({ message: "Budget created successfully", budget });
}