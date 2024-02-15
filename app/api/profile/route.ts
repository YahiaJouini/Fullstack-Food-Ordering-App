import { User } from "@/app/models/User";
import dbConnect from "@/app/utils/mongo.config";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    await dbConnect()
    const { formData } = await req.json()
    const session = await getServerSession()
    if (formData.username) {
        try {
            await User.findOneAndUpdate({ email: session?.user?.email }, { fullname: formData.username })
        } catch (err) {
            console.log(err)
        }
    }
    return NextResponse.json({ message: "success" }, { status: 200 })
}