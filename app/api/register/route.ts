import { NextResponse } from "next/server";
import dbConnect from "@/app/libs/mongo.config";
import { User } from "@/app/models/User";
import HandleErrors from "@/app/utils/handeErrors";
import bcrypt from "bcrypt"


export const POST = async (req: Request, res: Response) => {
    await dbConnect()
    const { email, password }: { email: string, password: string } = await req.json()
    const duplicate = await User.findOne({ email: email }).lean().exec()
    if (duplicate) {
        const err = {
            email: 'The email already registred',
        }
        return NextResponse.json({ error: err }, { status: 401 })
    }
    try {
        if (password === "") {
            return NextResponse.json({ error: { password: "Invalid Password" } }, { status: 401 })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ email, password: hashedPassword })
        return NextResponse.json({ userData: user }, { status: 200 })
    } catch (err: any) {
        if (err._message === "User validation failed") {
            const errors = HandleErrors(err)
            return NextResponse.json({ error: errors }, { status: 401 })
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}   