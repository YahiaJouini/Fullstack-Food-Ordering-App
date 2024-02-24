"use client"
import { useContext } from "react"
import { cartContext } from "@/app/utils/SessionProvider"
export const useCartContext = () => {
    const context = useContext(cartContext)
    if (!context) throw new Error('context needs to be within a cart context provider')
    return context

}