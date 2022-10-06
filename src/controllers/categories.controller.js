import Category from "../models/Category";

export const getCategories = async(req, res) => {
    try {
        const response = await Category.find();
        res.status(200).json(response);

    } catch (err) {
        res.status(500).json(err);
    }
};

export const createCategory = async(req, res) => {
    const { category, imgUrl } = await req.body;
    try {
        const newCategory = new Category({ category, imgUrl });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getCategoryById = async(req, res) => {
    const categoryId = await req.params.id;
    try {
        const response = await Category.findById(categoryId);
        switch (response) {
            case null:
                res.status(404).json({ message: 'Esta categoria no existe' });
                break;

            default:
                res.status(200).json(response);
                break;
        }
    } catch (err) {
        switch (err.name) {
            case 'CastError':
                res.status(404).json({ message: 'Esta categoria no existe' });
                break;

            default:
                res.status(404).json({ message: err });
                break;
        }
    }
};

export const updateCategoryById = async(req, res) => {
    const categoryId = await req.params.id;
    try {
        const response = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
        switch (response) {
            case null:
                res.status(404).json({ message: 'Esta categoria no existe' });
                break;

            default:
                res.status(200).json(response);
                break;
        }
    } catch (err) {
        switch (err.name) {
            case 'CastError':
                res.status(404).json({ message: 'Esta categoria no existe' });
                break;

            default:
                res.json({ message: err });
                break;
        }
    }
};

export const deleteCategoryById = async(req, res) => {
    const categoryId = await req.params.id;
    try {
        const response = await Category.findByIdAndDelete(categoryId);
        switch (response) {
            case null:
                res.status(404).json({ message: 'Esta categoria no existe' });
                break;

            default:
                res.status(200).json({ message: 'Eliminado con exito', itemEliminado: response });
                break;
        }
    } catch (err) {
        switch (err.name) {
            case 'CastError':
                res.status(404).json({ message: 'Esta categoria no existe' });
                break;

            default:
                res.status(404).json({ message: err });
                break;
        }
    }
};