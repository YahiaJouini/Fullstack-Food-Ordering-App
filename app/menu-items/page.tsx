"use client";
import useProfile from "@/hooks/useProfile";
import Tabs from "../components/layout/Tabs";
import { redirect } from "next/navigation";
import Loading from "../components/layout/Loading";
import Link from "next/link";
import Right from "../components/icons/Right";

const MenuPage = () => {
    const { loading, profile } = useProfile();

    if (loading) return <Loading />;

    if (!loading && !profile.admin) {
        redirect("/profile");
    }
    return (
        <section className="mt-20 max-w-[500px] mx-auto">
            <Tabs isAdmin={profile.admin} />
            <div className="w-full">
                <Link href="/menu-items/new" className="button flex items-center gap-x-2 justify-center">
                    Create new menu item <Right className="w-6" />
                </Link>
            </div>
        </section>
    );
};

export default MenuPage;
