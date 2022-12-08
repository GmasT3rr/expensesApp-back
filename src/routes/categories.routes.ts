import { Router } from "express";
import * as categoriesController from "../controllers/categories.controller";
import { authJwt } from "../middlewares";



const router = Router();


router.get('/', [authJwt.verifyToken, authJwt.anyRole],categoriesController.getCategories);

router.get('/:id',[authJwt.verifyToken, authJwt.anyRole], categoriesController.getCategoryById);

router.post('/',[authJwt.verifyToken, authJwt.anyRole], categoriesController.createCategory);

router.put('/:id',[authJwt.verifyToken, authJwt.anyRole], categoriesController.updateCategoryById);

router.delete('/:id',[authJwt.verifyToken, authJwt.anyRole], categoriesController.deleteCategoryById);

export default router;