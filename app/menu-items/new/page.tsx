"use client"

import Loading from "@/app/components/layout/Loading"
import Tabs from "@/app/components/layout/Tabs"
import useProfile from "@/hooks/useProfile"
import { redirect } from "next/navigation"
import Image from "next/image"
import { useState } from "react"

const NewMenupage = () => {


    const { loading, profile } = useProfile()
    const [formData, setFormData] = useState({
        imagePath: "",
        name: "",
        description: "",
        price: ""
    })
    const [saveStatus, setSaveStatus] = useState<null | "saving" | "saved">(null)
    const [error, setError] = useState("")


    const handleMenuSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value

        setFormData(prev => ({ ...prev, [name]: value }))
    }


    if (loading) return <Loading />
    if (!loading && !profile.admin) redirect('/profile')
    return (
        <div className="mt-20 max-w-[500px] mx-auto">
            <Tabs isAdmin={true} />
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

                        <div className="relative w-[140px] h-[110px] rounded-lg">
                            {
                                formData.imagePath ? (
                                    <Image
                                        src={formData.imagePath ?? ''}
                                        fill
                                        alt='Item Image' />
                                ) :
                                    (
                                        <div
                                            className="bg-gray-200 w-full h-full rounded-lg 
                                        grid place-content-center text-base font-medium text-gray-500">
                                            No image
                                        </div>
                                    )
                            }
                            <button
                                className="border border-gray-300 text-gray-500 font-medium mt-3">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
                <form
                    className="grow"
                    onSubmit={handleMenuSubmit}
                >
                    <input type="text"
                        placeholder="Item name"
                        value={formData.name}
                        onChange={handleChange}
                        name="name"
                    />
                    <input type="text"
                        value={formData.description}
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}

                    />
                    <input type="text"
                        placeholder="Base price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}

                    />
                    <button type="submit">Save</button>
                </form>

            </div>
        </div>
    )
}

export default NewMenupage