"use client";
import useProfile from "@/hooks/useProfile";
import Tabs from "../components/layout/Tabs";
import { redirect, useSearchParams } from "next/navigation";
import Loading from "../components/layout/Loading";
import Link from "next/link";
import Right from "../components/icons/Right";
import { useEffect, useState } from "react";

type MenuItem = {
    _id: string,
    name: string,
    imagePath: string,
    description: string,
    price: string
}
const MenuPage = () => {

    const query = useSearchParams()
    const admin = query.get("admin")
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

    if (loading && !admin) return <Loading />;

    if (!loading && !profile.admin) {
        redirect("/profile");
    }
    return (
        <section className="mt-20 max-w-[500px] mx-auto">
            <Tabs isAdmin={true} />
            <div className="w-full">
                <Link href={

                    {
                        pathname: "/menu-items/new",
                        query: { admin: "true" }
                    }}
                    className="button flex items-center gap-x-2 justify-center">
                    Create new menu item <Right className="w-6" />
                </Link>
            </div>

            <div>
                {
                    menu && (
                        menu.map(item => (
                            <div key={item._id}>
                                {item.name}
                            </div>
                        ))
                    )
                }
            </div>

            {

            }
        </section>
    );
};

export default MenuPage;
