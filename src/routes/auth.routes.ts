import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { verifySignup } from "../middlewares";


const router = Router();

router.post('/signin',authController.signIn);
router.post('/signup',[verifySignup.checkDuplicateUsernameOrEmail],authController.signUp);

export default router;