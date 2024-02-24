import { MenuItem } from "@/app/menu-items/page"
import Item from "../Menu/Item"

const ItemDisplay = ({ bestSeller }: { bestSeller: MenuItem[] }) => {
    return (
        <div className="grid grid-cols-3 gap-6 mt-12">
            {
                bestSeller.map(item => (
                    <Item
                        key={item._id}
                        data={item}
                    />
                ))
            }
        </div>
    )
}

export default ItemDisplay