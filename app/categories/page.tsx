'use client'
import { redirect } from 'next/navigation'
import Loading from '../components/layout/Loading'
import Tabs from '../components/layout/Tabs'
import useProfile from '@/hooks/useProfile'
import { useEffect, useState } from 'react'

type categoryType = {
    _id:string
    name:string
}
const CategoryPage = () => {

    const [newCategory, setNewCategory] = useState('')
    const [categories, setCategories] = useState<categoryType[]>([])
    const [error, setError] = useState('')
    const [created, setCreated] = useState(false)
    const { loading, profile } = useProfile()

    const handleNewCategory = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await fetch('/api/categories', {
            method: "POST",
            body: JSON.stringify(newCategory),
            headers: {
                "content-type": "application/json"
            }
        })
        if (res.ok) {
            setCreated(true)
            setTimeout(() => {
                setCreated(false)
            }, 2000);

        } else {
            const { error } = await res.json()
            setError(error)
        }
    }

    useEffect(() => {
        const getCategory = async () => {
            const data = await fetch('/api/categories')
            if (data) {
                const categories = await data.json()
                setCategories(categories.categories)
            }
        }

        getCategory()

    }, [created])


    if (loading) return <Loading />

    if (!loading && !profile.admin) {
        redirect('/profile')
    }
    return (
        <section className='mt-20 max-w-[500px] mx-auto'>
            <Tabs isAdmin={profile.admin} />
            {
                created && (
                    <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300 -mb-6 font-medium">
                        Changes saved
                    </h2>
                )
            }

            {
                error && (
                    <h2 className="text-center bg-red-100 p-4 rounded-lg border border-red-300 -mb-6 font-medium">
                        {error}
                    </h2>
                )
            }
            <form className='mt-12' onSubmit={handleNewCategory}>
                <div className='flex gap-x-4 items-end'>
                    <div className='grow'>
                        <label className='mb-4 block text-gray-500 '>
                            New category name
                        </label>
                        <input
                            type="text"
                            value={newCategory}
                            onChange={e => setNewCategory(e.target.value)}
                        />
                    </div>
                    <div className='pb-[18px]'>
                        <button type='submit'>Create</button>
                    </div>
                </div>


            </form>

            <div>
                {
                    categories.length > 0 && categories.map((c, idx) => (
                        <h1 key={idx}>{c.name}</h1>
                    ))
                }
            </div>
        </section>
    )
}


export default CategoryPage