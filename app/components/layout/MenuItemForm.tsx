import { MenuItem } from "@/app/menu-items/page"
import Image from "next/image"
import PopupDialog from "./PopupDialog"
import PopupContent from "./PopupContent"
import { useEffect, useRef, useState } from "react"
import MenuItemAddExtra from "./MenuItemAddExtra"
import { useParams } from "next/navigation"
import { submitFormProps } from "@/app/menu-items/edit/[id]/page"

type propType = {
  setFormData: React.Dispatch<React.SetStateAction<MenuItem>>
  formData: MenuItem
  handleMenuSubmit: ({ e, sizes, ingredients }: submitFormProps) => Promise<void>,
  handleMenuDelete?: (id: string) => void
}

export type ExtraType = {
  name: string
  price: string
}

const MenuItemForm = ({ formData, handleMenuSubmit, setFormData, handleMenuDelete }: propType) => {
  const popupRef = useRef<HTMLDialogElement>(null)
  const { id } = useParams();

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

  useEffect(() => {
    const fetchMenu = async () => {
      const data = await fetch("/api/menu-item");
      if (data.ok) {
        const res: MenuItem[] = await data.json();
        const item = res.filter((r) => r._id === id);

        setFormData({
          imagePath: item[0].imagePath ?? "",
          name: item[0].name ?? "",
          description: item[0].description ?? "",
          price: item[0].price ?? "",
        })

        if (item[0].sizes) {
          setSize(item[0].sizes)
        }
        if (item[0].ingredients) {
          setIngredients(item[0].ingredients)
        }
      }
    }
    if (id) {
      fetchMenu()
    }
  }, [])

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
        <form className="grow" onSubmit={(e) => handleMenuSubmit({ e, sizes, ingredients })}>

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
          {
            id && typeof id === "string" && (
              <button
                className="mt-2"
                onClick={() => handleMenuDelete && handleMenuDelete(id)}
                type="button"
              >
                Delete
              </button>
            )
          }

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
