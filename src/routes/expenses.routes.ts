import { Router } from "express";
import * as expensesController from "../controllers/expenses.controller";
import  {authJwt}  from "../middlewares";

const router = Router();


router.get('/', [authJwt.verifyToken, authJwt.isAdmin],expensesController.getExpenses);

router.get('/expense/:id',[authJwt.verifyToken, authJwt.isAdmin], expensesController.getExpenseById);

router.get('/userExpenses',[authJwt.verifyToken, authJwt.isAdmin], expensesController.getExpenseByUser);

router.post('/', [authJwt.verifyToken, authJwt.isAdmin],expensesController.createExpense);

router.put('/:id',[authJwt.verifyToken, authJwt.isAdmin], expensesController.updateExpenseById);

router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin],expensesController.deleteExpenseById);


export default router;