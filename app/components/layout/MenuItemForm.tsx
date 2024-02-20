import { MenuItem } from "@/app/menu-items/page"
import Image from "next/image"
import PopupDialog from "./PopupDialog"
import PopupContent from "./PopupContent"
import { useRef, useState } from "react"
import MenuItemAddExtra from "./MenuItemAddExtra"

type propType = {
  setFormData: React.Dispatch<React.SetStateAction<MenuItem>>
  formData: MenuItem
  handleMenuSubmit: (e: React.FormEvent, sizes: ExtraType[], ingredients: ExtraType[]) => Promise<void>
}

export type ExtraType = {
  name: string
  price: string
}

const MenuItemForm = ({ formData, handleMenuSubmit, setFormData, }: propType) => {

  const popupRef = useRef<HTMLDialogElement>(null)

  const [sizes, setSize] = useState<ExtraType[]>([])
  const [ingredients, setIngredients] = useState<ExtraType[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const togglePopup = () => {
    if (!popupRef.current) return

    popupRef.current.hasAttribute("open")
      ? popupRef.current.close()
      : popupRef.current.showModal()
  }

  return (
    <>
      <div className="flex items-start gap-10">
        <div>

          <div className="rounded-lg flex flex-col items-center gap-y-2 justify-center">

            <div className="relative w-[150px] h-[120px] rounded-lg">
              {formData.imagePath ? (
                <Image
                  src={formData.imagePath ?? ""}
                  fill
                  alt="Item Image"
                  className="rounded-xl"
                />

              ) : (
                <div
                  className="bg-gray-200 w-full h-full rounded-lg 
                              grid place-content-center text-base font-medium text-gray-500">
                  No image
                </div>
              )}
            </div>
            <button
              className="border border-gray-300 text-gray-500 font-medium mt-3"
              onClick={togglePopup}
            >
              Edit
            </button>
          </div>
        </div>
        <form className="grow" onSubmit={(e) => handleMenuSubmit(e, sizes, ingredients)}>

          <input
            type="text"
            placeholder="Item name"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />

          <input
            type="text"
            value={formData.description}
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Base price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />

          <MenuItemAddExtra
            name="Sizes"
            itemData={sizes}
            setItemData={setSize}
            addLabel='Add item size'

          />

          <MenuItemAddExtra
            name="Extra ingredients"
            itemData={ingredients}
            setItemData={setIngredients}
            addLabel='Add ingredients prices'

          />

          <button type="submit">Save</button>

        </form>
      </div>

      <PopupDialog
        togglePopup={togglePopup}
        ref={popupRef}
        setFormData={setFormData}
        formData={formData}
      >
        <PopupContent formData={formData} setFormData={setFormData} />
      </PopupDialog>
    </>
  );
};

export default MenuItemForm;
