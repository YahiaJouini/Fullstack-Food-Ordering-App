"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"

type userSession = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    location?: {
        phone: string,
        city: string,
        adress: string,
        postal: string
    } | null | undefined;

}
const ProfileForm = () => {

    const session = useSession()
    const userSession: userSession | null | undefined = session.data?.user
    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        adress: "",
        city: "",
        postal: ""
    })

    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value

        setFormData(prev => ({ ...prev, [name]: value }))
    }

    //saving data changes

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
            session.update({ formData: formData })
            setSaved(true)
            setTimeout(() => {
                setSaved(false)
            }, 3000)
        } else {
            setError(true)
        }
        setSaving(false)
    }


    useEffect(() => {
        if (session.status === "authenticated") {
            const location = userSession?.location
            setFormData({
                username: userSession?.name ?? "",
                phone: location?.phone ?? "",
                adress: location?.adress ?? "",
                postal: location?.postal ?? "",
                city: location?.city ?? ""
            })
        }
    }, [session, session.status])

    return (
        <div className="max-w-[500px] mx-auto">
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
            <div className="flex items-start gap-10">
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
                                        className="rounded-lg object-cover"
                                    />
                                ) :
                                    (
                                        <div
                                            className="bg-gray-200 w-full h-full rounded-lg 
                                        grid place-content-center text-6xl font-extrabold">
                                            {userSession?.name && userSession.name[0].toUpperCase()}
                                        </div>
                                    )
                            }
                        </div>
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
                        placeholder="Your email"

                    />
                    <input type="tel"
                        placeholder="Phone number"
                        name="phone"
                        onChange={handleChange}

                    />
                    <input type="text"
                        placeholder="City"
                        name="city"
                        onChange={handleChange}

                    />
                    <div className="flex items-center gap-4">
                        <input type="text"
                            placeholder="Street adress"
                            name="street"
                            onChange={handleChange}
                        />
                        <input type="text"
                            placeholder="Postal code"
                            name="postal"
                            onChange={handleChange} />
                    </div>

                    <button type="submit">Save</button>
                </form>

            </div>
        </div>
    )
}

export default ProfileForm