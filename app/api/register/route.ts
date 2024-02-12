import { NextResponse } from "next/server";
import dbConnect from "@/app/libs/mongo.config";
import { User } from "@/app/models/User";

export const POST = async (req: Request, res: Response) => {
    await dbConnect()
    const { email, password }: { email: string, password: string } = await req.json()
    const user = await User.create({ email, password })
    return NextResponse.json({ userData: user }, { status: 200 })
}   