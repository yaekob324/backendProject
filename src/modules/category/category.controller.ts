import type {Request, Response} from "express";
import {insertCategory} from "./category.repository";
export async function createCategory(request: Request, response: Response) {
   const category = await insertCategory(request);
   console.log(category);
    response.json({message: "Category created successfully",category});
}
export function getCategory(request: Request, response: Response) {
    response.json({message: "Category retrieved successfully"});
}
export function updateCategory(request: Request, response: Response) {
    response.json({message: "Category updated successfully"});
}
export function deleteCategory(request: Request, response: Response) {
    response.json({message: "Category deleted successfully"});
}   