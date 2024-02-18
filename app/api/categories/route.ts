import { NextResponse } from "next/server"
import { Category } from "@/app/models/Category"
export const POST = async (req: Request) => {
    const categories = await req.json()
    const category = await Category.create({ name: categories })
    if (!category) {
        return NextResponse.json({ error: "An error occured" }, { status: 401 })
    }
    return NextResponse.json(category, { status: 201 })
}

export const GET = async () => {
    const categories = await Category.find()
    if (!categories) {
        return NextResponse.json({ error: "An error occured" }, { status: 404 })
    }
    return NextResponse.json({ categories: categories }, { status: 200 })
}

export const PUT = async (req: Request) => {
    const { _id, newCategory } = await req.json()
    try {
        await Category.findByIdAndUpdate({ _id: _id }, { name: newCategory })
        return NextResponse.json({ message: "updated successfully" }, { status: 201 })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 401 })
    }
}