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