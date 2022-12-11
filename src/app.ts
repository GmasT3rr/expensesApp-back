import express from "express";
import morgan from "morgan";
import expensesRoutes from './routes/expenses.routes';
import categoriesRoutes from './routes/categories.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import rolesRoutes from './routes/roles.routes'

import {createRoles} from './libs/initialSetup';

import cors from 'cors';

const app = express();
createRoles();
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.json('welcome');
});

app.use(cors({origin:true,credentials:true}));
app.use(express.json());

app.use('/api/expenses', expensesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', rolesRoutes);






export default app;