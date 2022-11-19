import { Schema, model } from "mongoose";

const expenseSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    date: Date,
    imgUrl: String,
    userID:String
}, {
    timestamps: true,
    versionKey: false
});

export default (model('Product', expenseSchema));