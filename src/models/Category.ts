import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    category: String,
    imgUrl: String
}, {
    timestamps: true,
    versionKey: false
});

export default (model('Category', categorySchema));