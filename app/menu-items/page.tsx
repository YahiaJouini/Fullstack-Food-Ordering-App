"use client";
import useProfile from "@/hooks/useProfile";
import Tabs from "../components/layout/Tabs";
import { redirect } from "next/navigation";
import Loading from "../components/layout/Loading";
import Link from "next/link";
import Right from "../components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ExtraType } from "../components/layout/MenuItemForm";

export type MenuItem = {
    _id?: string,
    name: string,
    imagePath: string,
    description: string,
    price: string,
    category: string
    sizes?: ExtraType[],
    ingredients?: ExtraType[]
}
const MenuPage = () => {

    const { loading, profile } = useProfile();
    const [menu, setMenu] = useState<MenuItem[] | null>(null)

    const fetchMenu = async () => {
        const res = await fetch('/api/menu-item')
        if (!res.ok) {
            console.log("the was an error")
            return
        }
        const data = await res.json()
        setMenu(data)
    }
    useEffect(() => {
        fetchMenu()
    }, [])

    if (loading) return <Loading />

    if (!loading && !profile.admin) {
        redirect("/profile")
    }
    return (
        <section className="mt-20 max-w-xl mx-auto">
            <Tabs isAdmin={true} />
            <div className="w-full">
                <Link href="/menu-items/new"
                    className="button flex items-center gap-x-2 justify-center">
                    Create a new menu item <Right className="w-6" />
                </Link>
            </div>

            <div>
                {
                    menu && (
                        <>
                            <h2 className="text-sm text-gray-500 mt-8 mb-2">Edit menu item</h2>

                            <div className="grid grid-cols-3 gap-4">
                                {menu.map(item => (
                                    <Link
                                        href={`/menu-items/edit/${item._id}`}
                                        className="button p-4 gap-y-1 mb-3 flex flex-col items-center justify-center text-center"
                                        key={item._id}
                                    >
                                        <div className="w-[120px] h-[90px] relative rounded-lg">
                                            <Image src={item.imagePath ?? ""}
                                                alt='Item image' fill
                                                className="object-cover rounded-lg" />
                                        </div>

                                        {item.name}
                                    </Link>
                                ))}

                            </div>

                        </>
                    )
                }
            </div>
        </section >
    );
};

export default MenuPage;