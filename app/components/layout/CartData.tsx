import Cart from "../icons/Cart"

const CartData = ({ itemsCount }: { itemsCount: number }) => {
    return (
        <div>
            <div className="relative">
                <Cart />
                <div
                    className="h-4 w-5 rounded-full bg-primary absolute text-white text-[11px]
                top-[-6px] left-[13px] grid place-content-center">
                    {itemsCount}
                </div>
            </div>
        </div>
    )
}

export default CartData