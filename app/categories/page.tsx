'use client'
import { redirect } from 'next/navigation'
import Loading from '../components/layout/Loading'
import Tabs from '../components/layout/Tabs'
import useProfile from '@/hooks/useProfile'

const CategoryPage = () => {

    const { loading, profile } = useProfile()

    if (loading) return <Loading />

    if (!loading && !profile.admin) {
        redirect('/profile')
    }
    
    return (
        <section className='mt-20 max-w-[500px] mx-auto'>
            <Tabs isAdmin={true} />
        </section>
    )
}


export default CategoryPage