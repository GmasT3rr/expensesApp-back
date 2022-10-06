import express from "express";
import morgan from "morgan";
import expensesRoutes from './routes/expenses.routes';
import categoriesRoutes from './routes/categories.routes';
import cors from 'cors';

const app = express();
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.json('welcome');
});

app.use(cors());
app.use(express.json());

app.use('/expenses', expensesRoutes);
app.use('/categories', categoriesRoutes);



export default app;