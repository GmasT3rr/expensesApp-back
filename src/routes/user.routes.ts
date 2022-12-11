import { Router } from "express";
import * as userController from "../controllers/users.controller";
import {authJwt,verifySignup} from "../middlewares";

const router = Router();

router.get('/',[authJwt.verifyToken, authJwt.isAdmin], userController.getUsers);

router.get('/current/:id',[authJwt.verifyToken, authJwt.isAdmin], userController.getUsersById);

router.put('/:id',[authJwt.verifyToken, authJwt.isAdmin], userController.modifyUserById);
// router.put('/:id',[authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExists], userController.modifyUserById);

router.delete('/:id',[authJwt.verifyToken, authJwt.isAdmin], userController.deleteUserById);


export default router;