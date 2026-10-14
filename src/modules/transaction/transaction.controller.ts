import {Request, Response} from "express";
import {createTransaction} from "./transaction.repository";
import {AppError} from "../../middleware/error.middleware";
import {getTransactionById} from "./transaction.repository";
import {alterTransaction} from "./transaction.repository";
import {removeTransaction} from "./transaction.repository";
import { paginatedTransactionsByUserId } from "./transaction.repository";

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
        throw new AppError(404, "Category not found");
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
export async function getAllTransactions(
    req: Request<Record<string, never>, any, unknown, { page?: string; limit?: string }>,
    res: Response
) {
     const userId = req.session.userId;

     if(!userId){
        throw new AppError(401, "Unauthorized user");
    }

    const page = Number(req.query.page || 1);
    const limit = Math.min(Number(req.query.limit || 10), 100);
    const offset = (page - 1) * limit;
    const fetchedTransactions = await paginatedTransactionsByUserId(userId, limit + 1, offset);

    if (fetchedTransactions.length === 0) {
        throw new AppError(404, "Transactions not found");
    }

    const hasNextPage = fetchedTransactions.length > limit;
    const paginatedTransactions = fetchedTransactions.slice(0, limit);

    res.json({
        message: "Transactions retrieved successfully",
        paginatedTransactions,
        hasNextPage
    });
}