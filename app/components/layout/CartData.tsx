import Link from "next/link"
import Cart from "../icons/Cart"

const CartData = ({ itemsCount }: { itemsCount: number }) => {
    return (
        <Link href='/cart'>
            <div className="relative">
                <Cart />
                <div
                    className="h-4 w-5 rounded-full bg-primary absolute text-white text-[11px]
                top-[-6px] left-[13px] grid place-content-center">
                    {itemsCount}
                </div>
            </div>
        </Link>
    )
}

export default CartData