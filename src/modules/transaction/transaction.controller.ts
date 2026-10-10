import {Request, Response} from "express";
export function createTransaction(req: Request, res: Response) {
    res.json({message: "Transaction created successfully"});
} 
export function getTransaction(req: Request, res: Response) {
    res.json({message: "Transaction retrieved successfully"});
}
export function updateTransaction(req: Request, res: Response) {
    res.json({message: "Transaction updated successfully"});
}
export function deleteTransaction(req: Request, res: Response) {
    res.json({message: "Transaction deleted successfully"});
}
export function getAllTransactions(req: Request, res: Response) {
    res.json({message: "All transactions retrieved successfully"});
}