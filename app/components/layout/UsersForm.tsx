"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { redirect, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Loading from "./Loading"
import useProfile from "@/hooks/useProfile"

const UserForm = () => {
    const { id } = useParams()
    const session = useSession()
    const [formData, setFormData] = useState({
        username: "",
        image: "",
        email: "",
        location: {
            phone: "",
            adress: "",
            city: "",
            postal: "",
        },
        admin: false
    })

    const [saveStatus, setSaveStatus] = useState<null | "saving" | "saved">(null)
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        if (name === "username") {
            setFormData(prev => ({ ...prev, [name]: value }))
        } else {
            setFormData(prev => ({ ...prev, location: { ...prev.location, [name]: value } }))
        }
    }

    //saving data changes

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaveStatus('saving')
        const res = await fetch('/api/users/edit', {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': "Application/json"
            }
        })
        if (res.ok) {
            setSaveStatus('saved')
            setTimeout(() => {
                setSaveStatus(null)
            }, 2000)

            //only update the session when the admin edits his account
            if (formData.email === session.data?.user?.email) {
                session.update()
            }
        } else {
            setError('An error occured !')
        }

        if (saveStatus !== null) setSaveStatus(null)

    }


    const getUserData = async () => {

        const res = await fetch(`/api/users/edit?id=${id}`)
        if (res.ok) {
            const data = await res.json()
            setFormData({
                username: data.fullname ?? "",
                image: data.image ?? "",
                email: data.email ?? "",
                location: {
                    phone: data.location.phone ?? "",
                    adress: data.location.adress ?? "",
                    city: data.location.city ?? "",
                    postal: data.location.postal ?? ""
                },
                admin: data.admin

            })
        } else {
            redirect('/users')
        }
    }

    useEffect(() => {
        getUserData()
    }, [])
    return (
        <div className="max-w-xl mx-auto">
            {
                saveStatus === "saved" && (
                    <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300 my-6 font-medium">
                        Changes saved
                    </h2>
                )
            }

            {
                saveStatus === "saving" && (
                    <h2 className="text-center bg-blue-100 p-4 rounded-lg border border-blue-300 my-6 font-medium">
                        Saving ...
                    </h2>
                )
            }

            {
                error && (
                    <h2 className="text-center bg-red-100 p-4 rounded-lg border border-red-300 my-6 font-medium">
                        {error}
                    </h2>
                )
            }
            <div className="flex items-start gap-10">
                <div>
                    <div className="rounded-lg flex flex-col items-center gap-y-2 justify-center">

                        <div className="relative w-[110px] h-[110px] rounded-lg">
                            {
                                formData?.image !== "" ? (
                                    <Image
                                        src={formData.image}
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
                                            {formData?.username && formData.username[0].toUpperCase()}
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
                        value={formData?.email ?? ""}
                        disabled
                        name="email"
                        placeholder="Your email"

                    />
                    <input type="tel"
                        placeholder="Phone number"
                        name="phone"
                        value={formData.location.phone}
                        onChange={handleChange}

                    />
                    <input type="text"
                        placeholder="City"
                        name="city"
                        onChange={handleChange}
                        value={formData.location.city}

                    />
                    <div className="flex items-center gap-4">
                        <input type="text"
                            placeholder="Street adress"
                            name="adress"
                            value={formData.location.adress}
                            onChange={handleChange}
                        />
                        <input type="text"
                            placeholder="Postal code"
                            name="postal"
                            value={formData.location.postal}
                            onChange={handleChange} />
                    </div>

                    <div className="flex items-center gap-x-2 mb-4">
                        <label>Admin</label>
                        <input
                            type="checkbox"
                            checked={formData.admin}
                            onClick={() => setFormData(prev => ({ ...prev, admin: !prev.admin }))}
                        />
                    </div>

                    <button type="submit">Save</button>
                </form>

            </div>
        </div>
    )
}

export default UserForm