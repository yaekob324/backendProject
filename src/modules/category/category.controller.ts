import type {Request, Response} from "express";
import {insertCategory} from "./category.repository";
import {getCategoriesById} from "./category.repository";
import { AppError } from "../../middleware/error.middleware";
import { alterCategory } from "./category.repository";
type categoryParamsType={
    categoryId:string
}

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


export async function updateCategory(request: Request <categoryParamsType>, response: Response) {
    const {categoryId}=request.params
    const userId=request.session.userId
    if(!userId){
        throw new AppError(401,"Unauthorized User")
    }
    const updatedResult=await alterCategory(request,categoryId,userId)
    response.json({message:"category successfully updated",updatedResult})

}
export function deleteCategory(request: Request, response: Response) {
    response.json({message: "Category deleted successfully"});
}   