"use client"
import { signOut } from "next-auth/react"
const Logout = () => {
    return (
        <button
            className="bg-primary text-white px-8 rounded-full py-2"
            onClick={() => signOut()}
        >
            Logout
        </button>
    )
}

export default Logout