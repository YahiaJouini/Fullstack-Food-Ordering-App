import Image from "next/image"
type ItemProps = {
    imagePath: string,
    name: string,
    description: string,
    price: string
}
const Item = ({ imagePath, name, description, price }: ItemProps) => {
    return (
        <div className="bg-gray-300 p-4 hover:bg-gray-200 rounded-xl text-center transition-all duration-500 hover:shadow-md hover:shadow-black/25">

            <div className=" mx-auto h-40 w-52 relative">
                <Image
                    src={imagePath}
                    fill
                    alt="PIZZA"
                    className="object-cover rounded-xl"
                />
            </div>
            <h4 className="font-bold my-3 text-xl">{name}</h4>
            <p className="text-gray-500  mb-3 text-sm">
                {description}
            </p>

            <button className="bg-primary text-white px-5 py-2 rounded-full cursor-pointer">
                Add to cart {price}$

            </button>
        </div>
    )
}

export default Item