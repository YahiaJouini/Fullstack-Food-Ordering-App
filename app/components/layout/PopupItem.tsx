"use client"
import { MenuItem } from "@/app/menu-items/page"
import Image from "next/image"
import { useState } from "react"
import { ExtraType } from "./MenuItemForm"

type propType = {
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>,
    data: MenuItem
}
const PopupItem = ({ setShowPopup, data }: propType) => {

    const [size, setSize] = useState<ExtraType>({ name: "", price: "" })
    document.body.style.overflow = 'hidden'

    return (
        <div className="fixed inset-0 bg-black/80 grid place-content-center z-10">
            <div className="bg-white p-4 rounded-lg flex flex-col gap-y-8">

                <div className="relative w-[400px] h-[200px] rounded-xl">
                    <Image src={data.imagePath} alt='Item image' fill className="object-cover  rounded-xl" />
                </div>

                <p className="text-center text-gray-600 font-bold">{data.description}</p>

                <div>
                    <p className="font-bold mb-3">Pick your size</p>
                    {
                        data.sizes?.map((size, idx) => (
                            <div className="flex items-center gap-x-2 mb-2 px-2 py-1 rounded-lg border border-gray-400" key={idx}>
                                <input type="radio" name="rad" onClick={() => setSize({ name: size.name, price: size.price })} />
                                <div>
                                    {size.name} ${size.price}
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="flex items-center gap-x-4">

                    <button onClick={() => {
                        setShowPopup(false)
                        document.body.style.overflow = 'auto'
                    }}>
                        Close
                    </button>

                    <button className="submit">
                        Add to cart
                    </button>

                </div>
            </div>
        </div>
    )
}

export default PopupItem