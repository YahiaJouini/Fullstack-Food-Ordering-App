import { Types, Schema, model, models } from "mongoose";

const ExtraPriceShema = new Schema({
    name: String,
    price: String
})

const MenuSchema = new Schema({
    imagePath: String,
    name: String,
    description: String,
    price: String,
    category: Types.ObjectId,
    sizes: [ExtraPriceShema],
    ingredients: [ExtraPriceShema]

}, { timestamps: true })

export const Menu = models.Menu || model('Menu', MenuSchema)