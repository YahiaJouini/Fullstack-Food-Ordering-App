import { MenuItem } from "@/app/menu-items/page"
import { useCartContext } from "@/hooks/useCartContext"
import Image from "next/image"
import { useState } from "react"
import PopupItem from "../layout/PopupItem"

const Item = ({ data }: { data: MenuItem }) => {

    const { addToCart } = useCartContext()
    const [showPopup, setShowPopup] = useState(false)

    const handleAddToCart = () => {
        if (data.sizes?.length === 0 && data.ingredients?.length === 0) {
            addToCart(data)
        } else {
            setShowPopup(true)
        }
    }

    return (
        <>
            {showPopup && <PopupItem setShowPopup={setShowPopup} data={data} />}
            <div className="bg-gray-300 p-4 hover:bg-gray-200 rounded-xl text-center 
        transition-all duration-500 hover:shadow-md hover:shadow-black/25">

                <div className=" mx-auto h-40 w-52 relative">
                    <Image
                        src={data.imagePath}
                        fill
                        alt="PIZZA"
                        className="object-cover rounded-xl"
                    />
                </div>
                <h4 className="font-bold my-3 text-xl">{data.name}</h4>
                <p className="text-gray-500  mb-3 text-sm">
                    {data.description}
                </p>

                <button
                    className="bg-primary text-white px-5 py-2 rounded-full cursor-pointer"
                    onClick={handleAddToCart}
                >
                    Add to cart ${data.price}
                </button>
            </div>
        </>
    )
}

export default Item