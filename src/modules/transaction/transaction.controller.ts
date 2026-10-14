import {Request, Response} from "express";
import {createTransaction} from "./transaction.repository";
import {AppError} from "../../middleware/error.middleware";
import {getTransactionById} from "./transaction.repository";
import {alterTransaction} from "./transaction.repository";
import {removeTransaction} from "./transaction.repository";

type transactionParamsType={
    transactionId:string
};
export async function createTransactionController(req: Request, res: Response) {
    const {category_id, amount_cents, type, description} = req.body;
    const userId = req.session.userId;
    if(!userId){
        throw new AppError(401, "Unauthorized user");
    }
    if(amount_cents <= 0){
        throw new AppError(400, "Amount must be greater than zero");
    }
    if(!category_id){
        throw new AppError(400, "Category is required");
    }
   
    if(!description){
        throw new AppError(400, "Description is required");
    }
    const transaction = await createTransaction({
        userId,
        category_id,
        amount_cents,
        type,
        description
    });
    if(!transaction){
        throw new AppError(500, "Transaction creation failed");
    }
    res.json({message: "Transaction created successfully", transaction});
} 
export async function getTransaction(req: Request<transactionParamsType>, res: Response) {

    const transactionId = req.params.transactionId;
    const userId = req.session.userId;
    if(!userId){
        throw new AppError(401, "Unauthorized user");
    }

    const transaction = await getTransactionById(transactionId, userId);
    if(!transaction){
        throw new AppError(404, "Transaction not found");
    }
    res.json({message: "Transaction retrieved successfully", transaction});
}
export async function updateTransaction(req: Request<transactionParamsType>, res: Response) {
    const transactionId = req.params.transactionId;
    const userId = req.session.userId; 
    if(!userId){
        throw new AppError(401, "Unauthorized user");
    }   
    const transaction = await alterTransaction(req, transactionId, userId);
    if(!transaction){
        throw new AppError(404, "Transaction not found");
    }
    res.json({message: "Transaction updated successfully", transaction});
}
export async function deleteTransaction(req: Request<transactionParamsType>, res: Response) {
    const transactionId = req.params.transactionId;
    const userId = req.session.userId;
    if(!userId){
        throw new AppError(401, "Unauthorized user");
    }
    const transaction = await removeTransaction(transactionId, userId);
    if(!transaction){
        throw new AppError(404, "Transaction not found");
    }
    res.status(204).send();
}
export function getAllTransactions(req: Request, res: Response) {
    res.json({message: "All transactions retrieved successfully"});
}