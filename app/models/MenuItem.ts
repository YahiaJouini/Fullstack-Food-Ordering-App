import { Schema, model, models } from "mongoose";

const MenuSchema = new Schema({
    imagePath: String,
    name: String,
    description: String,
    price: String

}, { timestamps: true })

export const Menu = models.Menu || model('Menu', MenuSchema)