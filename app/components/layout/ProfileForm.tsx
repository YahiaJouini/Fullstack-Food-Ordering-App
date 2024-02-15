"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
type userSessionType = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}
const ProfileForm = ({ user }: { user: userSessionType }) => {

    const session = useSession()
    const [formData, setFormData] = useState({
        username: user.name || session.data?.user?.name || "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value

        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch('/api/profile', {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ formData })
        })
        if (res.ok) {
            session.update({ name: formData.username })
        }

    }
    return (
        <div className="max-w-md mx-auto">
            <div className="flex items-center gap-4">
                <div>
                    <div className="rounded-lg flex flex-col items-center gap-y-2 justify-center">

                        <div className="relative w-[110px] h-[110px]">
                            <Image
                                src={user.image ?? ""}
                                fill
                                alt="User Image"
                                quality={100}
                                className="rounded-lg object-contain"

                            /></div>
                        <button className="text-sm w-[120px] hover:bg-black hover:text-white transition-all duration-300">
                            Edit Avatar
                        </button>
                    </div>
                </div>
                <form
                    className="grow"
                    onSubmit={handleProfileUpdate}
                >
                    <input type="text"
                        placeholder="first and last name"
                        value={formData.username}
                        onChange={handleChange}
                        name="username"
                    />
                    <input type="email"
                        value={user.email ?? ""}
                        disabled
                        name="email"

                    />
                    <button type="submit" className="">Save</button>
                </form>

            </div>
        </div>
    )
}

export default ProfileForm