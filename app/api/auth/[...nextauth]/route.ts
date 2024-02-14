import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "@/app/libs/mongo.config"
import bcrypt from "bcrypt"
import { User } from "@/app/models/User"
import { NextResponse } from "next/server"

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any, req) {
                await dbConnect()
                try {
                    const { email, password } = credentials
                    const user: any = await User.findOne({ email: email }).lean().exec()
                    if (user) {
                        const valid = await bcrypt.compare(password, user.password)
                        if (valid) {
                            return user
                        }
                    }
                } catch (err) {
                    console.log(err)
                    return null
                }
                return null
            }
        })
    ]
})

export { handler as GET, handler as POST }