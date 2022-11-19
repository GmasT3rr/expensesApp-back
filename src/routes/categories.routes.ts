import { Router } from "express";
import * as categoriesController from "../controllers/categories.controller";
import { authJwt } from "../middlewares";



const router = Router();


router.get('/', [authJwt.verifyToken, authJwt.isAdmin],categoriesController.getCategories);

router.get('/:id',[authJwt.verifyToken, authJwt.isAdmin], categoriesController.getCategoryById);

router.post('/',[authJwt.verifyToken, authJwt.isAdmin], categoriesController.createCategory);

router.put('/:id',[authJwt.verifyToken, authJwt.isAdmin], categoriesController.updateCategoryById);

router.delete('/:id',[authJwt.verifyToken, authJwt.isAdmin], categoriesController.deleteCategoryById);

export default router;