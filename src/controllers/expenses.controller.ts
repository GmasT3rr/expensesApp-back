import Product from "../models/Expense";
import User from '../models/User'


export const getExpenses = async(req:any,res:any) => {
    try {
        const response = await Product.find();
        res.status(200).json(response);

    } catch (err) {
        res.status(500).json(err);
    }
};

export const createExpense = async(req:any,res:any) => {
    const { name, category, price, imgUrl, date, userID } = await req.body;
    try {
        const newExpense = new Product({ name, category, price, imgUrl,date,userID });
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getExpenseById = async(req:any,res:any) => {
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
    } catch (err:any) {
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
export const getExpenseByUser = async(req:any,res:any) => {
     const userEmail:string = await req.headers.email;
     try {
         const user:any = await User.findOne({email:userEmail})
         const userId = user._id
         const response = await Product.find({userID:userId})
         res.status(200).json(response)
        
     } catch (err) {
        res.status(404).json({ message: err });
     }

};

export const updateExpenseById = async(req:any,res:any) => {
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
    } catch (err:any) {
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

export const deleteExpenseById = async(req:any,res:any) => {
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
    } catch (err:any) {
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