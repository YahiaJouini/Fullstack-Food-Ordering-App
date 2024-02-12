import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "The Email Is Required !"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "The Password Is Required !"],
        validate: (pass: string) => {
            if (!pass?.length || pass.length < 5) {
                throw new Error('password must be at least 5 characters long')
            }
        }
    }
}, { timestamps: true })


UserSchema.pre('save', async function (next) {
    this.password = "hashed password"
    next()
})

export const User = models?.User || model('User', UserSchema)