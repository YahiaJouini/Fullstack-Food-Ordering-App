import { NextResponse } from "next/server"
import { User } from "@/app/models/User"


export const POST = async (req: Request) => {
    const id = await req.json()
    const user = await User.findOne({ _id: id })
    if (!user) {
        return NextResponse.json({ err: "Could not find the user" }, { status: 404 })
    }
    return NextResponse.json(user, { status: 200 })
}


export const PUT = async (req: Request) => {
    const formData = await req.json()
    const user = await User.findOneAndUpdate({ email: formData.email }, {
        fullname: formData.username,
        location: formData.location
    })
    if (!user) {
        return NextResponse.json({ err: "Could not find the user" }, { status: 404 })
    }
    return NextResponse.json(user, { status: 200 })
}