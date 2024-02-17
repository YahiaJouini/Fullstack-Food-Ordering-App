import { User } from "@/app/models/User";
import dbConnect from "@/app/utils/mongo.config";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    await dbConnect()
    const { formData } = await req.json()
    const session = await getServerSession()
    if (formData) {
        const location = {
            phone: formData.phone,
            city: formData.city,
            adress: formData.adress,
            postal: formData.postal
        }
        try {
            await User.findOneAndUpdate({ email: session?.user?.email }, { fullname: formData.username, location: location })
        } catch (err) {
            console.log(err)
        }
    }
    return NextResponse.json({ message: "success" }, { status: 200 })
}


export const GET = async () => {
    const session = await getServerSession()
    const user = await User.findOne({ email: session?.user?.email })
    if (!user) {
        return NextResponse.json({ error: "user not found" }, { status: 404 })
    }
    return NextResponse.json({ location: user.location }, { status: 200 })
}