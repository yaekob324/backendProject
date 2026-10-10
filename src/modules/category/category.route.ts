import {createCategory} from "./category.controller";
import {getCategory} from "./category.controller";
import {updateCategory} from "./category.controller";
import {deleteCategory} from "./category.controller";
import express from "express";

export const categoryRouter = express.Router();
categoryRouter.post("/create", createCategory);
categoryRouter.get("/get", getCategory);
categoryRouter.patch("/update/:categoryId", updateCategory);
categoryRouter.delete("/delete/:categoryId", deleteCategory);