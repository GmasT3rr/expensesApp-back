import { Router } from "express";
import * as expensesController from "../controllers/expenses.controller";

const router = Router();


router.get('/', expensesController.getExpenses);

router.get('/:id', expensesController.getExpenseById);

router.post('/', expensesController.createExpense);

router.put('/:id', expensesController.updateExpenseById);

router.delete('/:id', expensesController.deleteExpenseById);


export default router;