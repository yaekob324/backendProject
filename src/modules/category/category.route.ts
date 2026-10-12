import {createCategory} from "./category.controller";
import {getCategory} from "./category.controller";
import {updateCategory} from "./category.controller";
import {deleteCategory} from "./category.controller";
import {validator} from "../../middleware/validation.middleware";
import {categorySchema} from "./category.schema";
import {authMiddleware} from "../../middleware/auth.middleware"; 
import {errorHandler} from "../../middleware/error.middleware"; 
import { categoryUpdateSchema } from "./category.schema";      
import express from "express";

export const categoryRouter = express.Router();
categoryRouter.post("/create", validator(categorySchema), authMiddleware, createCategory);
categoryRouter.get("/get",authMiddleware, getCategory);
categoryRouter.patch("/update/:categoryId",validator(categoryUpdateSchema),authMiddleware, updateCategory);
categoryRouter.delete("/delete/:categoryId",authMiddleware, deleteCategory);