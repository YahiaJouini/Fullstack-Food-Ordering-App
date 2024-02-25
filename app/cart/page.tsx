'use client'
import { useCartContext } from "@/hooks/useCartContext"
import SectionHeaders from "../components/layout/SectionHeaders"
import Image from "next/image"
import Trash from "../components/icons/Trash"
import { getFinalPrice } from "../components/layout/PopupItem"
import { MenuItem } from "../menu-items/page"
import { useEffect, useState } from "react"

const page = () => {
    const { cart, removeFromCart } = useCartContext()
    const [formData, setFormData] = useState({
        phone: "",
        city: "",
        adress: "",
        postal: ""
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const name = e.target.name
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    let total = 0
    const handleTotalAndPriceDisplay = (item: MenuItem) => {
        total += getFinalPrice(item.price, item.sizes, item.ingredients)
        return getFinalPrice(item.price, item.sizes, item.ingredients)
    }

    const fetchUser = async () => {
        const res = await fetch('/api/profile')
        if (res.ok) {
            const json = await res.json()
            setFormData({
                phone: json.user.location.phone ?? "",
                city: json.user.location.city ?? "",
                adress: json.user.location.adress ?? "",
                postal: json.user.location.postal ?? "",

            })
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <section className="mt-14">
            <div className="text-center mt-20 mb-10">
                <SectionHeaders mainHeader="Cart" />
            </div>
            {
                cart.length === 0 && (
                    <h3 className="text-center font-bold text-xl">No products in your shopping cart !</h3>
                )
            }
            <div className="grid gap-14 grid-cols-2">
                <div>
                    {
                        cart.length > 0 && cart.map(item => (
                            <div key={item._id} className="flex items-center gap-x-2 mb-2 py-2 border-b font-medium">
                                <div className="w-36 h-24 relative">
                                    <Image src={item.imagePath} alt='item image' fill className="object-cover rounded-xl element-shadow" />
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <div>
                                        <h3>{item.name}</h3>
                                        {
                                            item.sizes && item.sizes[0] && item.sizes[0].name &&
                                            <h3 className="text-sm text-gray-800 mt-2">Size : {item.sizes[0].name}</h3>
                                        }

                                        {
                                            item.ingredients && item.ingredients.length > 0 &&
                                            (
                                                <>
                                                    {
                                                        item.ingredients.map((ing, idx) => (
                                                            <h3 key={idx} className="text-sm text-gray-400 mt-1">
                                                                Extra {ing.name} ${ing.price}
                                                            </h3>
                                                        ))
                                                    }
                                                </>

                                            )
                                        }
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <h1>
                                            {handleTotalAndPriceDisplay(item)}
                                        </h1>

                                        <div
                                            className="border w-10 h-10 grid place-content-center 
                                        rounded-xl cursor-pointer"
                                            onClick={() => removeFromCart(item._id ?? '')}
                                        >
                                            <Trash className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                    <div className="py-4 text-right text-gray-500">
                        Subtotal : <span className="text-lg font-bold text-black">${total}</span>
                    </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">

                    <h2 className="text-lg font-medium my-3">Checkout</h2>
                    <form>
                        <div>
                            <label className="text-gray-500 text-[15px] mb-2 block">Phone number</label>
                            <input type="tel"
                                placeholder="Phone number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}

                            />
                        </div>
                        <div>
                            <label className="text-gray-500 text-[15px] my-2 block">City</label>
                            <input type="text"
                                placeholder="City"
                                name="city"
                                onChange={handleChange}
                                value={formData.city}

                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="grow">
                                <label className="text-gray-500 text-[15px] mb-2 block">Address</label>
                                <input type="text"
                                    placeholder="Street adress"
                                    name="adress"
                                    value={formData.adress}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grow">
                                <label className="text-gray-500 text-[15px] mb-2 block">Postal</label>
                                <input type="text"
                                    placeholder="Postal code"
                                    name="postal"
                                    value={formData.postal}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <button type="submit" className="mt-2">Pay ${total}</button>
                    </form>

                </div>
            </div>
        </section >
    )
}

export default page