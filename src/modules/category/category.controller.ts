import type {Request, Response} from "express";

export function createCategory(request: Request, response: Response) {
    response.json({message: "Category created successfully"});
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