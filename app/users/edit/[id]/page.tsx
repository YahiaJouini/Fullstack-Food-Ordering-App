"use client"
import Loading from '@/app/components/layout/Loading'
import Tabs from '@/app/components/layout/Tabs'
import useProfile from '@/hooks/useProfile'
import { redirect } from 'next/navigation'

const UserEditPage = () => {
    const { loading, profile } = useProfile()

    if (loading) return <Loading />
    if (!loading && !profile.admin) redirect('/profile')
    return (
        <section className='mt-20 max-w-xl mx-auto'>
            <Tabs isAdmin={true} />
        </section>
    )
}

export default UserEditPage