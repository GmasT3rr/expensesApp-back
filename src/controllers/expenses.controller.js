import Product from "../models/Expense";


export const getExpenses = async(req, res) => {
    try {
        const response = await Product.find();
        res.status(200).json(response);

    } catch (err) {
        res.status(500).json(err);
    }
};

export const createExpense = async(req, res) => {
    const { name, category, price, imgUrl } = await req.body;
    try {
        const newExpense = new Product({ name, category, price, imgUrl });
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getExpenseById = async(req, res) => {
    const expenseId = await req.params.id;
    try {
        const response = await Product.findById(expenseId);
        switch (response) {
            case null:
                res.status(404).json({ message: 'Este producto no existe' });
                break;

            default:
                res.status(200).json(response);
                break;
        }
    } catch (err) {
        switch (err.name) {
            case 'CastError':
                res.status(404).json({ message: 'Este producto no existe' });
                break;

            default:
                res.status(404).json({ message: err });
                break;
        }
    }
};

export const updateExpenseById = async(req, res) => {
    const expenseId = await req.params.id;
    try {
        const response = await Product.findByIdAndUpdate(expenseId, req.body, { new: true });
        switch (response) {
            case null:
                res.status(404).json({ message: 'Este producto no existe' });
                break;

            default:
                res.status(200).json(response);
                break;
        }
    } catch (err) {
        switch (err.name) {
            case 'CastError':
                res.status(404).json({ message: 'Este producto no existe' });
                break;

            default:
                res.json({ message: err });
                break;
        }
    }
};

export const deleteExpenseById = async(req, res) => {
    const productId = await req.params.id;
    try {
        const response = await Product.findByIdAndDelete(productId);
        switch (response) {
            case null:
                res.status(404).json({ message: 'Este producto no existe' });
                break;

            default:
                res.status(200).json({ message: 'Eliminado con exito', itemEliminado: response });
                break;
        }
    } catch (err) {
        switch (err.name) {
            case 'CastError':
                res.status(404).json({ message: 'Este producto no existe' });
                break;

            default:
                res.status(404).json({ message: err });
                break;
        }
    }
};