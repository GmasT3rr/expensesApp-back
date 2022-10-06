import { Router } from "express";
import * as categoriesController from "../controllers/categories.controller";

const router = Router();


router.get('/', categoriesController.getCategories);

router.get('/:id', categoriesController.getCategoryById);

router.post('/', categoriesController.createCategory);

router.put('/:id', categoriesController.updateCategoryById);

router.delete('/:id', categoriesController.deleteCategoryById);

export default router;