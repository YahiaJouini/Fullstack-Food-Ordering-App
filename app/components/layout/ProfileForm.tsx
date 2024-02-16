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
    const [fileError, setFileError] = useState("")

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

    //converting image to a binary-to-text encoding scheme 
    const imageToBase64 = (file: any) => {
        const reader = new window.FileReader()
        reader.readAsDataURL(file)
        const data = new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result)
            reader.onerror = (err) => reject(err)
        })
        return data
    }


    //checking if image size is less than 0.5MB
    const checkImageSize = (bytes: number) => {
        return (bytes / 1024) <= 500
    }

    //uploading the image to the database
    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const files = e.target.files
        if (files && files.length === 1) {

            // if file size is acceptable we save it to the database
            if (checkImageSize(files[0].size)) {
                const data = await imageToBase64(files[0])
                if (data) {
                    setSaving(true)
                    const res = await fetch('/api/upload', {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            "content-type": "application/json"
                        }
                    })
                    setSaving(false)
                    if (res.ok) {
                        setSaved(true)
                        setTimeout(() => {
                            setSaved(false)
                        }, 3000)
                    }
                } else {
                    setError(true)
                }


            } else {
                setFileError("File provided is larger than 0.5MB")
                setTimeout(() => {
                    setFileError("")
                }, 2000)
            }

        } else {
            setFileError("Please select one file")
            setTimeout(() => {
                setFileError("")
            }, 2000)
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
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFile}
                                accept=".jpg, .jpeg, .png"
                            />
                            <span
                                className="block border border-gray-600 rounded-lg p-2 text-center cursor-pointer
                                text-sm font-bold w-[120px] hover:bg-black hover:text-white transition-all duration-300"
                            >
                                Edit
                            </span>
                            {
                                fileError !== "" && (
                                    <div className="text-center text-red-500 font-medium break-words w-[120px] mt-2">
                                        {fileError}
                                    </div>
                                )
                            }

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