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
                        <Link className={path === "/categories" ? 'active' : ''} href="/categories">
                            Categories
                        </Link>
                        <Link className={path === "/menu-items" ? 'active' : ''} href="/menu-items">
                            Menu Items
                        </Link>
                        <Link className={path === "/users" ? 'active' : ''} href="/users">
                            Users
                        </Link>
                    </>
                )
            }
        </div>
    )
}

export default Tabs