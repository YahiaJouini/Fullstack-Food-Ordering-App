import { NextResponse } from "next/server"
import { User } from "@/app/models/User"


export const GET = async (req: Request) => {

    const url = new URL(req.url)
    const id = url.searchParams.get('id')
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
        location: formData.location,
        admin: formData.admin
    })
    if (!user) {
        return NextResponse.json({ err: "Could not find the user" }, { status: 404 })
    }
    return NextResponse.json(user, { status: 200 })
}