import { Router } from "express";
import * as userController from "../controllers/users.controller";
import {authJwt,verifySignup} from "../middlewares";

const router = Router();

router.get('/',[authJwt.verifyToken], userController.getUsers);

router.get('/current',[authJwt.verifyToken], userController.getUsersById);

router.post('/',[authJwt.verifyToken, verifySignup.checkRolesExists], userController.createUser);

router.put('/:id',[authJwt.verifyToken, verifySignup.checkRolesExists], userController.modifyUserById);

router.delete('/:id',[authJwt.verifyToken], userController.deleteUserById);


export default router;