import { forwardRef } from "react"

type PropsType = {
    children: React.ReactNode,
    togglePopup: () => void,
    formData: {
        imagePath: string;
        name: string;
        description: string;
        price: string;
        category: string
    },
    setFormData: React.Dispatch<React.SetStateAction<{
        imagePath: string;
        name: string;
        description: string;
        price: string;
        category: string
    }>>
}



const PopupDialog = forwardRef<HTMLDialogElement, PropsType>(({ children, togglePopup, setFormData, formData }, ref) => {
    const HandleCancel = () => {
        setFormData(prev => ({ ...prev, imagePath: "" }))
        togglePopup()
    }

    const HandleAdd = async () => {
        if (!formData.imagePath) return
        togglePopup()
    }
    return (
        <dialog ref={ref} className="main-shadow rounded-lg">
            <div className=" px-2 py-4">
                {children}
                <div className="flex items-center justify-center gap-20 border-t-2 pt-5">
                    <button onClick={HandleAdd}
                        className="submit w-[200px]">
                        Add
                    </button>
                    <button
                        onClick={HandleCancel}
                        className="w-[200px]"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </dialog >
    )
})

export default PopupDialog