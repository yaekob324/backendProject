import type {Request, Response} from "express";
import {insertCategory} from "./category.repository";
import {getCategoriesById} from "./category.repository";
import { AppError } from "../../middleware/error.middleware";
export async function createCategory(request: Request, response: Response) {
   const category = await insertCategory(request);
   console.log(category);
    response.json({message: "Category created successfully",category});
}
export async function getCategory(request: Request, response: Response) {
    const userId = request.session.userId;
    if(!userId){
        throw new AppError(401, "Unauthorized");
    }
    const categories = await getCategoriesById(userId);
    response.json({message: "Categories retrieved successfully",categories});
}


export function updateCategory(request: Request, response: Response) {
    response.json({message: "Category updated successfully"});
}
export function deleteCategory(request: Request, response: Response) {
    response.json({message: "Category deleted successfully"});
}   