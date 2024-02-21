import { User } from "@/app/models/User";
import { NextResponse } from "next/server";

export const GET = async () => {
    const res = await User.find()
    if (!res) {
        return NextResponse.json({ error: 'Unable to fetch users' }, { status: 404 })
    }
    return NextResponse.json(res, { status: 200 })
}