"use client"

import Loading from "@/app/components/layout/Loading"
import Tabs from "@/app/components/layout/Tabs"
import useProfile from "@/hooks/useProfile"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import Left from "@/app/components/icons/Left"
import MenuItemForm, { ExtraType } from "@/app/components/layout/MenuItemForm"

const NewMenupage = () => {
    const router = useRouter()

    const { loading, profile } = useProfile()
    const [formData, setFormData] = useState({
        imagePath: "",
        name: "",
        description: "",
        price: ""
    })
    const [saveStatus, setSaveStatus] = useState<null | "saving" | "saved">(null)
    const [error, setError] = useState("")


    const handleMenuSubmit = async (e: React.FormEvent, sizes: ExtraType[], ingredients: ExtraType[]) => {
        e.preventDefault()
        const emptyField = Object.values(formData).some(value => value === "")
        if (emptyField) return

        setSaveStatus("saving")
        const res = await fetch('/api/menu-item', {
            method: "POST",
            body: JSON.stringify({ ...formData, sizes, ingredients }),
            headers: {
                "Content-Type": "application/json"
            }
        })


        if (res.ok) {
            router.push('/menu-items')
        } else {
            setError('An error occured')
        }

        if (saveStatus !== null) setSaveStatus(null)

    }

    if (loading) return <Loading />
    if (!loading && !profile.admin) router.push('/profile')
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
            <div className="w-full mb-12 mt-8">
                <Link href={
                    {
                        pathname: "/menu-items",
                        query: { admin: "true" }
                    }
                } className="button flex items-center gap-x-2 justify-center">
                    <Left className="w-6" /> View all menu items
                </Link>
            </div>
            <MenuItemForm
                setFormData={setFormData}
                formData={formData}
                handleMenuSubmit={handleMenuSubmit} />
        </div>
    )
}

export default NewMenupage