import express from "express";
import morgan from "morgan";
import expensesRoutes from './routes/expenses.routes';

const app = express();
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.json('welcome');
});

app.use(express.json());

app.use('/expenses', expensesRoutes);


export default app;