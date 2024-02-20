"use client"

import Loading from "@/app/components/layout/Loading"
import Tabs from "@/app/components/layout/Tabs"
import useProfile from "@/hooks/useProfile"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import PopupDialog from "@/app/components/layout/PopupDialog"
import PopupContent from "@/app/components/layout/PopupContent"
import Link from "next/link"
import Left from "@/app/components/icons/Left"
import { MenuItem } from "../../page"
import MenuItemForm from "@/app/components/layout/MenuItemForm"
import { MenuItem as MenuItemType } from "@/app/menu-items/page"


const EditMenuPage = () => {

    
    const router = useRouter()
    const { id } = useParams()

    const { loading, profile } = useProfile()
    const [formData, setFormData] =useState <MenuItemType> ({
        imagePath: "",
        name: "",
        description: "",
        price: ""
    })
    const [saveStatus, setSaveStatus] = useState<null | "saving" | "saved">(null)
    const [error, setError] = useState("")


    const handleMenuSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const emptyField = Object.values(formData).some(value => value === "")
        if (emptyField) return
        setSaveStatus("saving")
        const res = await fetch('/api/menu-item', {
            method: "PUT",
            body: JSON.stringify({ ...formData, id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.ok) {
            router.push('/menu-items?admin=true')
        } else {
            setError('An error occured')
            setSaveStatus(null)
        }

        if (saveStatus !== null) setSaveStatus(null)

    }

    useEffect(() => {

        const fetchMenu = async () => {
            const data = await fetch("/api/menu-item")
            if (data.ok) {
                const res: MenuItem[] = await data.json()
                const item = res.filter(r => r._id === id)
                setFormData({
                    imagePath: item[0].imagePath,
                    name: item[0].name,
                    description: item[0].description,
                    price: item[0].price
                })
            }
        }

        fetchMenu()
    }, [])

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

export default EditMenuPage