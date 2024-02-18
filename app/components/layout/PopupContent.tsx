import Image from "next/image";

type PropsType = {
    formData: {
        imagePath: string;
        name: string;
        description: string;
        price: string;
    },
    setFormData: React.Dispatch<React.SetStateAction<{
        imagePath: string;
        name: string;
        description: string;
        price: string;
    }>>
}
const PopupContent = ({ formData, setFormData }: PropsType) => {
    return (
        <div className="w-[800px] h-[600px] overflow-y-auto scrollbar-thin scrollbar-webkit">

            <div className="grid grid-cols-3 gap-10 p-10">
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => {
                        const path = `/menu-images/food${i}.jpg`
                        const selected = formData.imagePath === path
                        return (
                            <div
                                className={`border-4  rounded-xl element-shadow 
                            w-[170px] h-[150px] relative cursor-pointer 
                            ${selected ? "border-green-600" : 'border-gray-300'}`}
                                onClick={() => setFormData(prev => ({ ...prev, imagePath: path }))}
                                key={i}
                            >
                                <Image
                                    src={path}
                                    fill
                                    className="object-cover rounded-lg "
                                    alt="food"
                                />
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}

export default PopupContent