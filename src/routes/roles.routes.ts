import { Router } from "express";
import * as rolesController from "../controllers/roles.controller";
import {authJwt} from "../middlewares";

const router = Router();

router.get('/',[authJwt.verifyToken, authJwt.isAdmin], rolesController.getRoles);



export default router;