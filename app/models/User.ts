import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    fullname: {
        type: String
    },
    email: {
        type: String,
        required: [true, "The email is required"],
        lowercase: true,
    },
    image: String,
    password: {
        type: String,
        validate: (pass: string) => {
            if (!pass?.length || pass.length < 5) {
                throw new Error('password must be at least 5 characters long')
            }
        }
    }, location: {
        phone: String,
        city: String,
        adress: String,
        postal: String
    },
    admin: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

export const User = models?.User || model('User', UserSchema)