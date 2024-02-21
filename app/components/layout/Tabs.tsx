"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
const Tabs = ({ isAdmin }: { isAdmin: boolean }) => {
    const path = usePathname()
    return (
        <div className={`flex items-center ${isAdmin ? 'justify-between' : 'justify-center'} my-10 tabs`}>
            <Link className={path === "/profile" ? 'active' : ''} href="/profile">Profile</Link>
            {
                isAdmin && (
                    <>
                        <Link className={path === "/categories" ? 'active' : ''}
                            href="/categories">
                            Categories
                        </Link>
                        <Link className={/menu-items/.test(path) ? 'active' : ''}
                            href="/menu-items">
                            Menu Items
                        </Link>
                        <Link className={/users/.test(path) ? 'active' : ''}
                            href='/users'>
                            Users
                        </Link>
                        <Link className={path === "/orders" ? 'active' : ''}
                            href='/orders'>
                            Orders
                        </Link>
                    </>
                )
            }
        </div>
    )
}

export default Tabs