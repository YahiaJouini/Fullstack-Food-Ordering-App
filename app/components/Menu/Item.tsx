import Image from "next/image"

const Item = () => {
    return (
        <div className="bg-gray-200 p-4 hover:bg-white rounded-lg text-center transition-all duration-500 hover:shadow-md hover:shadow-black/25">

            <div className=" mx-auto h-32 w-32 relative">
                <Image
                    src="/pizza.png"
                    fill
                    alt="PIZZA"
                />
            </div>
            <h4 className="font-bold my-3 text-xl">Pepperoni Pizza</h4>
            <p className="text-gray-500  mb-3 text-sm">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium nam eos omnis consequuntur, explicabo dolore recusandae iste quisquam laboriosam harum, quidem eius! Ea quasi voluptates veniam corrupti explicabo tenetur consequatur.
            </p>

            <button className="bg-primary text-white px-5 py-2 rounded-full cursor-pointer">
                Add to cart 12$

            </button>
        </div>
    )
}

export default Item