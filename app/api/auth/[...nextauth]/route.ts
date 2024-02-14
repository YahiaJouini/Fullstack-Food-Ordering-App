import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import dbConnect from "@/app/utils/mongo.config"
import bcrypt from "bcrypt"
import { User } from "@/app/models/User"
import { Account, User as AuthUser } from "next-auth"

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
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ], callbacks: {
        async signIn({ user, account }: { user: AuthUser, account: Account }) {
            if (account?.provider !== "google") {
                return true
            } else {
                await dbConnect()
                const exists = await User.findOne({ email: user.email }).lean().exec()
                if (!exists) {
                    try {
                        await User.create({ email: user?.email })
                        console.log("user created")
                    } catch (err) {
                        console.log(err)
                        return false
                    }
                }
                return true
            }
        }
    }
} as any)

export { handler as GET, handler as POST }