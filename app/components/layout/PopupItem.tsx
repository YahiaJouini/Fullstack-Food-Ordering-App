"use client"
import { MenuItem } from "@/app/menu-items/page"
import Image from "next/image"
import { useState } from "react"
import { ExtraType } from "./MenuItemForm"
import { useCartContext } from "@/hooks/useCartContext"

type propType = {
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>,
    data: MenuItem
}
const PopupItem = ({ setShowPopup, data }: propType) => {
    document.body.style.overflow = 'hidden'

    const [size, setSize] = useState<ExtraType[]>([{ name: "", price: "" }])
    const [ingredients, setIngredients] = useState<ExtraType[]>([])
    const { addToCart } = useCartContext()


    const handleIngredients = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, ing: ExtraType) => {
        const checked = e.currentTarget.checked
        if (checked) {
            setIngredients(prev => [...prev, { name: ing.name, price: ing.price }])
        } else {
            setIngredients(prev => {
                return prev.filter(pr => pr.name !== ing.name)
            })
        }
    }

    let selectedPrice = Number(data.price)
    if (size[0].price) selectedPrice += Number(size[0].price)
    if (ingredients.length > 0) {
        for (let ing of ingredients) {
            selectedPrice += Number(ing.price)
        }
    }

    const handleAddToCart = () => {
        const tempItem: MenuItem = { ...data, sizes: size, ingredients: ingredients }
        addToCart(tempItem)
        setShowPopup(false)
    }

    const DisplaySizes = () => {
        if (data.sizes && data.sizes.length > 0) return (
            <div>

                <p className="font-bold mb-3">Pick your size</p>
                {
                    data.sizes?.map((size, idx) => (
                        <div className="flex items-center gap-x-2 mb-2 p-2 rounded-lg border border-gray-400" key={idx}>
                            <input type="radio" name="rad" onClick={() =>
                                setSize([{ name: size.name, price: size.price }])} />
                            <div>
                                {size.name} ${size.price}
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

    const DisplayExtras = () => {
        if (data.ingredients && data.ingredients.length > 0) return (
            <div>
                <p className="font-bold mb-3">Any extras ?</p>
                {
                    data.ingredients?.map((ing, idx) => (
                        <div className="flex items-center gap-x-2 mb-2 p-2 rounded-lg border border-gray-400"
                            key={idx}>
                            <input
                                type="checkbox"
                                onClick={(e) => handleIngredients(e, ing)} />
                            <div>
                                {ing.name} ${ing.price}
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black/80 grid place-content-center z-10">
            <div className="bg-white p-4 rounded-lg flex flex-col gap-y-8">

                <div className="relative w-[400px] h-[200px] rounded-xl">
                    <Image src={data.imagePath} alt='Item image' fill className="object-cover  rounded-xl element-shadow" />
                </div>

                <p className="text-center text-gray-600 font-bold">{data.description}</p>

                {DisplaySizes()}
                {DisplayExtras()}

                <div className="flex items-center gap-x-4">

                    <button onClick={() => setShowPopup(false)}>
                        Close
                    </button>

                    <button className="submit" onClick={handleAddToCart}>
                        Add to cart <span className="ml-1">${selectedPrice}</span>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default PopupItem