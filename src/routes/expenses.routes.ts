import { Router } from "express";
import * as expensesController from "../controllers/expenses.controller";
import  {authJwt}  from "../middlewares";

const router = Router();


router.get('/', [authJwt.verifyToken, authJwt.anyRole],expensesController.getExpenses);

router.get('/expense/:id',[authJwt.verifyToken, authJwt.anyRole], expensesController.getExpenseById);

router.get('/userExpenses',[authJwt.verifyToken, authJwt.anyRole], expensesController.getExpenseByUser);

router.post('/', [authJwt.verifyToken, authJwt.anyRole],expensesController.createExpense);

router.put('/:id',[authJwt.verifyToken, authJwt.anyRole], expensesController.updateExpenseById);

router.delete('/:id', [authJwt.verifyToken, authJwt.anyRole],expensesController.deleteExpenseById);


export default router;