"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
const Tabs = ({ isAdmin }: { isAdmin: boolean }) => {
    const path = usePathname()
    return (
        <div className="flex items-center gap-x-4 justify-center my-10 tabs">
            <Link className={path === "/profile" ? 'active' : ''} href="/profile">Profile</Link>
            {
                isAdmin && (
                    <>
                        <Link className={path === "/categories" ? 'active' : ''}
                            href={

                                {
                                    pathname: "/categories",
                                    query: { admin: "true" }
                                }}>
                            Categories
                        </Link>
                        <Link className={/menu-items/.test(path) ? 'active' : ''}
                            href={
                                {
                                    pathname: "/menu-items",
                                    query: { admin: "true" }
                                }}>
                            Menu Items
                        </Link>
                        <Link className={path === "/users" ? 'active' : ''} href={

                            {
                                pathname: "/users",
                                query: { admin: "true" }
                            }}>
                            Users
                        </Link>
                    </>
                )
            }
        </div>
    )
}

export default Tabs