"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"

const ProfileForm = () => {

    const session = useSession()
    const userSession = session.data?.user
    const [formData, setFormData] = useState({
        username: userSession?.name || "",
    })
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value

        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.username === userSession?.name || formData.username.length <= 2) return
        setSaving(true)
        setSaved(false)
        setError(false)
        const res = await fetch('/api/profile', {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ formData })
        })
        if (res.ok) {
            session.update({ name: formData.username })
            setSaved(true)
            setTimeout(() => {
                setSaved(false)
            }, 3000)
        } else {
            setError(true)
        }
        setSaving(false)

    }


    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const files = e.target.files
        if (files && files.length > 0) {
            console.log('uploading image logic here')
        }

    }





    useEffect(() => {
        if (session.status === "authenticated") {
            setFormData({ username: userSession?.name ?? "" })
        }

    }, [session, session.status])

    return (
        <div className="max-w-md mx-auto">
            {
                saved && (
                    <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300 my-6 font-medium">
                        Changes saved
                    </h2>
                )

            }

            {
                saving && (
                    <h2 className="text-center bg-blue-100 p-4 rounded-lg border border-blue-300 my-6 font-medium">
                        Saving ...
                    </h2>
                )
            }

            {
                error && (
                    <h2 className="text-center bg-red-100 p-4 rounded-lg border border-red-300 my-6 font-medium">
                        An error occured !
                    </h2>
                )
            }
            <div className="flex items-center gap-4">
                <div>
                    <div className="rounded-lg flex flex-col items-center gap-y-2 justify-center">

                        <div className="relative w-[110px] h-[110px] rounded-lg">
                            {
                                userSession?.image ? (
                                    <Image
                                        src={userSession?.image ?? ""}
                                        fill
                                        alt="User Image"
                                        quality={100}
                                        className="rounded-lg object-contain"
                                    />
                                ) :
                                    (
                                        <div className="bg-gray-200 w-full h-full rounded-lg grid place-content-center">
                                            <h1 className="text-6xl font-extrabold">{userSession?.name && userSession.name[0]}</h1>
                                        </div>
                                    )
                            }
                        </div>
                        <label>
                            <input type="file" className="hidden" onChange={handleFile} />
                            <span
                                className="block border border-gray-600 rounded-lg p-2 text-center cursor-pointer
                                text-sm font-bold w-[120px] hover:bg-black hover:text-white transition-all duration-300"
                            >
                                Edit
                            </span>
                        </label>
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
                        value={userSession?.email ?? ""}
                        disabled
                        name="email"

                    />
                    <button type="submit">Save</button>
                </form>

            </div>
        </div>
    )
}

export default ProfileForm