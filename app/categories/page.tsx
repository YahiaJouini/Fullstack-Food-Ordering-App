'use client'
import { redirect } from 'next/navigation'
import Loading from '../components/layout/Loading'
import Tabs from '../components/layout/Tabs'
import useProfile from '@/hooks/useProfile'
import { useEffect, useState } from 'react'

type categoryType = {
    _id: string
    name: string
}
const CategoryPage = () => {

    const [newCategory, setNewCategory] = useState('')
    const [categories, setCategories] = useState<categoryType[]>([])
    const [error, setError] = useState('')
    const [created, setCreated] = useState(false)
    const [editing, setEditing] = useState<categoryType | null>(null)
    const { loading, profile } = useProfile()

    const handleNewCategory = async (e: React.FormEvent) => {
        e.preventDefault()
        if (newCategory === "" || newCategory === editing?.name) {
            setError('No changes has been made')
            setTimeout(() => {
                setError('')
            }, 2000)
            return
        }
        const res = await fetch('/api/categories', {
            method: editing ? 'PUT' : 'POST',
            body: editing ? JSON.stringify({ _id: editing._id, newCategory: newCategory }) : JSON.stringify(newCategory),
            headers: {
                "content-type": "application/json"
            }
        })
        if (res.ok) {
            setCreated(true)
            setNewCategory('')
            setEditing(null)
            setTimeout(() => {
                setCreated(false)
            }, 2000);

        } else {
            const { error } = await res.json()
            setError(error)
        }
    }

    const handleEdit = (cat: categoryType) => {
        setEditing(cat)
        setNewCategory(cat.name)
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
                        <label className='mb-2 block text-gray-500'>
                            {editing ? 'Update category: ' : "New category name"}
                            {editing && (<b>{editing.name}</b>)}
                        </label>
                        <input
                            type="text"
                            value={newCategory}
                            onChange={e => setNewCategory(e.target.value)}
                        />
                    </div>
                    <div className={`pb-[18px] ${editing && 'flex items-center gap-2'}`}>
                        <button type='submit'>{editing ? 'Update' : 'Create'}</button>
                        {
                            editing && (

                                <button type='button' onClick={() => {
                                    setEditing(null)
                                    setNewCategory('')
                                }
                                }>
                                    cancel
                                </button>

                            )
                        }

                    </div>
                </div>


            </form>

            <div>
                <h2 className='mt-6 mb-2 text-sm text-gray-500'>
                    Edit category :
                </h2>
                {
                    categories.length > 0 && categories.map((c, idx) => (
                        <div key={idx}
                            className='border border-gray-400 bg-gray-200 hover:bg-gray-100 transition-all rounded-xl mb-3 py-2 px-4 flex gap-1 cursor-pointer '
                            onClick={() => handleEdit(c)}
                        >
                            <span className='font-medium'>{c.name}</span>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}


export default CategoryPage