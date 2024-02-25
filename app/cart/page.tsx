'use client'
import { useCartContext } from "@/hooks/useCartContext"
import SectionHeaders from "../components/layout/SectionHeaders"
import Image from "next/image"
import Trash from "../components/icons/Trash"
import { getFinalPrice } from "../components/layout/PopupItem"

const page = () => {
    const { cart, removeFromCart } = useCartContext()

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
            <div className="grid gap-4 grid-cols-2">
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
                                        <h1 className="font-bold text-lg">
                                            {getFinalPrice(item.price, item.sizes, item.ingredients)}</h1>

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
                </div>
            </div>
        </section >
    )
}

export default page