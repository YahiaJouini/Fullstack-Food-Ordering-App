import { NextResponse } from "next/server"
import { Menu } from "@/app/models/MenuItem"

export const POST = async (req: Request) => {
    const data = await req.json()
    try {
        const res = await Menu.create(data)
        return NextResponse.json({ result: res }, { status: 201 })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 401 })
    }
}

export const GET = async () => {
    try {
        const res = await Menu.find()
        return NextResponse.json(res, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 401 })
    }
}

export const PUT = async (req: Request) => {
    const data = await req.json()
    const res = await Menu.findByIdAndUpdate(data.id, data)

    if (!res) {
        return NextResponse.json({ err: "Update Failed" }, { status: 401 })
    }
    return NextResponse.json({ message: "Updated Successfully" }, { status: 201 })
}

export const DELETE = async (req: Request) => {
    const id = await req.json()
    const res = await Menu.deleteOne({ _id: id })
    if (!res) {
        return NextResponse.json({ error: "Unable to delete" }, { status: 400 })
    }
    return NextResponse.json({ message: "Success" }, { status: 200 })
}