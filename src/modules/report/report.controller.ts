import {Request, Response} from "express";
export function monthlyReport(req: Request, res: Response) {
    res.json({message: "Monthly report generated successfully"});
}
export function categorySpendingReport(req: Request, res: Response) {
    res.json({message: "Category spending report generated successfully"});
}