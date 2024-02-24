"use client"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import SectionHeaders from "../components/layout/SectionHeaders"
import { MenuItem } from "../menu-items/page"
import Item from "../components/Menu/Item"
type categoryType = {
    _id: string,
    name: string
}
const page = () => {
    const [categories, setCategories] = useState<categoryType[]>([])
    const [menu, setMenu] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchCategories = async () => {
        const res = await fetch('/api/categories')
        if (res.ok) {
            const data = await res.json()
            setCategories(data.categories)
        } else {
            setError('An error occured')
        }
    }

    const fetchMenu = async () => {
        const res = await fetch('/api/menu-item')
        if (res.ok) {
            const data = await res.json()
            setMenu(data)
        } else {
            setError('An error occured')
        }
    }

    useEffect(() => {
        fetchCategories()
        fetchMenu()
        setLoading(false)
    }, [])
    if (loading) {
        return <div className="grid place-content-center h-[80vh]">
            <ClipLoader
                color="#d63636"
                size={80}
                speedMultiplier={2}
            />
        </div>
    }
    return (
        <section className="mt-20">
            {error && (
                <h1 className="text-center text-lg text-red-500 font-bold">{error}</h1>
            )}

            {
                categories.length > 0 && categories.map(cat => (
                    <div key={cat._id}>
                        <div className="text-center">
                            <SectionHeaders mainHeader={cat.name} />
                        </div>
                        <div className="flex justify-center items-center gap-x-24 flex-wrap  my-14">
                            {menu.filter(m => m.category === cat._id).map(item => (
                                <div className="w-[500px]" key={item._id}>
                                    <Item
                                        data={item}
                                    />
                                </div>

                            ))}
                        </div>
                    </div>
                ))
            }
        </section>
    )
}

export default page