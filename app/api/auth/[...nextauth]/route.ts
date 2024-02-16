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
            async authorize(credentials: any) {
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

                        const location = {
                            phone: "",
                            city: "",
                            adress: "",
                            postal: ""
                        }

                        await User.create({ fullname: user.name, email: user?.email, location: location })
                        console.log("user created")

                    } catch (err) {
                        console.log(err)
                        return false
                    }
                }
                return true
            }
        },
        async session({ session, token }: { session: any, token: any }) {
            await dbConnect()
            const foundUser: any = await User.findOne({ email: token.email }).lean().exec()
            if (foundUser) {
                session.user.location = foundUser.location
                session.user.name = foundUser.fullname
            }
            else {
                console.log("An error occured when creating a session")
            }
            return session
        },
        async jwt({ token, trigger, session }: { token: any, trigger: any, session: any }) {
            if (trigger === "update" && session.formData) {
                token.name = session.formData.username
                const location = {
                    phone: session.formData.phone,
                    city: session.formData.city,
                    adress: session.formData.adress,
                    postal: session.formData.postal
                }
                token.location = location
            }

            return token
        }
    }
} as any)

export { handler as GET, handler as POST }