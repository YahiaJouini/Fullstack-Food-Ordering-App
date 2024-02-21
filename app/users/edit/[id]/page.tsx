"use client"
import Left from '@/app/components/icons/Left'
import Loading from '@/app/components/layout/Loading'
import Tabs from '@/app/components/layout/Tabs'
import UserForm from '@/app/components/layout/UsersForm'
import useProfile from '@/hooks/useProfile'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const UserEditPage = () => {
    const { loading, profile } = useProfile()

    if (loading) return <Loading />
    if (!loading && !profile.admin) redirect('/profile')
    return (
        <section className='mt-20 max-w-xl mx-auto'>
            <Tabs isAdmin={true} />
            <div className="w-full mb-12 mt-8">
                <Link
                    href="/users"
                    className="button flex items-center gap-x-2 justify-center"
                >
                    <Left className="w-6" /> View all users
                </Link>
            </div>
            <UserForm />
        </section>
    )
}

export default UserEditPage