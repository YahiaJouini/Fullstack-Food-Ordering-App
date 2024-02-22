"use client"
import useProfile from "@/hooks/useProfile"
import Tabs from "../components/layout/Tabs"
import Loading from "../components/layout/Loading"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

export type userType = {
    _id: string,
    fullname: string,
    email: string,
    location: {
        phone: String,
        city: String,
        adress: String,
        postal: String
    },
    admin: boolean
}
const page = () => {
    const { loading, profile } = useProfile()
    const [users, setUsers] = useState<userType[]>([])

    const fetchUsers = async () => {
        const res = await fetch("/api/users")
        if (res.ok) {
            const usersFetched = await res.json()
            setUsers(usersFetched)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (loading) return <Loading />
    if (!loading && !profile.admin) redirect('/profile')
    return (
        <section className='mt-20 max-w-xl mx-auto'>
            <Tabs isAdmin={true} />
            <div>
                <h2 className='mt-6 mb-2 text-sm text-gray-500'>
                    Users :
                </h2>
                {
                    users.length > 0 ? users.map(user => (
                        <div key={user._id}
                            className='bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-between gap-1 p-2 px-4 mb-3'
                        >
                            <div className="flex flex-col gap-y-2">
                                <span className='font-medium'>{user.fullname ? user.fullname : "No name"}</span>
                                <span className='font-medium text-gray-400'>{user.email}</span>
                            </div>
                            <div>
                                <Link className="button" href={`users/edit/${user._id}`}>
                                    Edit
                                </Link>
                            </div>
                        </div>
                    )) : (
                        <h1 className='text-lg font-medium'>
                            No users available
                        </h1>
                    )
                }
            </div>
        </section>
    )
}

export default page