import { MenuItem } from "@/app/menu-items/page"
import Item from "../Menu/Item"

const ItemDisplay = ({ bestSeller }: { bestSeller: MenuItem[] }) => {
    return (
        <div className="grid grid-cols-3 gap-6 mt-12">
            {
                bestSeller.map(item => (
                    <Item
                        key={item._id}
                        imagePath={item.imagePath}
                        name={item.name}
                        price={item.price}
                        description={item.description}
                    />
                ))
            }
        </div>
    )
}

export default ItemDisplay