import {createCategory} from "./category.controller";
import {getCategory} from "./category.controller";
import {updateCategory} from "./category.controller";
import {deleteCategory} from "./category.controller";
import {validator} from "../../middleware/validation.middleware";
import {categorySchema} from "./category.schema";
import {authMiddleware} from "../../middleware/auth.middleware"; 
import {errorHandler} from "../../middleware/error.middleware";       
import express from "express";

export const categoryRouter = express.Router();
categoryRouter.post("/create", validator(categorySchema), authMiddleware,errorHandler, createCategory);
categoryRouter.get("/get",authMiddleware,errorHandler, getCategory);
categoryRouter.patch("/update/:categoryId",authMiddleware,errorHandler, updateCategory);
categoryRouter.delete("/delete/:categoryId",authMiddleware,errorHandler, deleteCategory);