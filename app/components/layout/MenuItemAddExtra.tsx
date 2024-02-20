import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import { ExtraType } from "./MenuItemForm";

type propType = {
  name: string,
  itemData: ExtraType[]
  setItemData: React.Dispatch<React.SetStateAction<ExtraType[]>>,
  addLabel: string
}

const MenuItemAddExtra = ({ name, itemData, setItemData, addLabel }: propType) => {

  const addSize = () => {
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
    <div className="bg-gray-300 p-2 rounded-lg mb-2">
      <label>{name}</label>
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
        className="bg-white flex items-center gap-x-2 justify-center"
        type="button"
        onClick={addSize}
      >
        <Plus />
        {addLabel}
      </button>
    </div>
  );
};

export default MenuItemAddExtra
