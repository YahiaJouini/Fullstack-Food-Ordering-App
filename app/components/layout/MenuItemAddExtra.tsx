import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import { ExtraType } from "./MenuItemForm";
import UpAndDown from "../icons/UpAndDown";
import { useState } from "react";

type propType = {
  name: string,
  itemData: ExtraType[]
  setItemData: React.Dispatch<React.SetStateAction<ExtraType[]>>,
  addLabel: string
}

const MenuItemAddExtra = ({ name, itemData, setItemData, addLabel }: propType) => {

  const [isOpen, setIsOpen] = useState(false)

  const addData = () => {
    if (itemData.length === 3) {
      return
    }
    setItemData((prev) => [...prev, { name: "", price: "0" }])

  }

  const handleExtraValue = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {

    const name = e.target.name
    const value = e.target.value
    setItemData((prev) => {
      const newSizes = [...prev]
      newSizes[idx] = { ...newSizes[idx], [name]: value }
      return newSizes
    })
  }

  const handleDelete = (idx: number) => {
    setItemData((prev) => prev.filter((v, i) => i !== idx))
  }
  return (
    <div className="bg-gray-300 p-2 rounded-md mb-2">
      <div className="flex gap-2 items-center mb-3 cursor-pointer w-fit mx-auto"
        onClick={() => setIsOpen(prev => !prev)}>
        <UpAndDown />
        <h3 className="text-gray-700 font-bold text-[16px]">
          {name} ({itemData.length})
        </h3>
      </div>
      <div className={isOpen ? 'block' : 'hidden'}>
        {itemData.length > 0 &&
          itemData.map((size, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  name="name"
                  onChange={(e) => handleExtraValue(e, idx)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Extra price</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  value={size.price}
                  name="price"
                  onChange={(e) => handleExtraValue(e, idx)}
                />
              </div>
              <button
                type="button"
                className="bg-white  grid place-content-center -mb-2 w-12 h-10"
                onClick={() => handleDelete(idx)}
              >
                <Trash />
              </button>
            </div>
          ))}
        <button
          className="bg-white flex items-center gap-x-2 justify-center border-none my-2"
          type="button"
          onClick={addData}
        >
          <Plus />
          {addLabel}
        </button>
      </div>

    </div>
  )
}

export default MenuItemAddExtra
