import { NextResponse } from "next/server";
import dbConnect from "@/app/libs/mongo.config";
import { User } from "@/app/models/User";
import HandleErrors from "@/app/utils/handeErrors";

export const POST = async (req: Request, res: Response) => {
    await dbConnect()
    const { email, password }: { email: string, password: string } = await req.json()

    try {
        const user = await User.create({ email, password })
        return NextResponse.json({ userData: user }, { status: 200 })
    } catch (err: any) {
        if (err._message === "User validation failed") {
            const errors = HandleErrors(err)
            return NextResponse.json({ error: errors }, { status: 401 })
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}   