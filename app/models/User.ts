import { Schema, model, models } from "mongoose";
import bcrypt from 'bcrypt';
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "The email is required"],
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "The password is required"],
        validate: (pass: string) => {
            if (!pass?.length || pass.length < 5) {
                throw new Error('password must be at least 5 characters long')
            }
        }
    }
}, { timestamps: true })

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

export const User = models?.User || model('User', UserSchema)