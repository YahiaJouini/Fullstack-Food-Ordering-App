"use client"
import { SessionProvider as Provider } from "next-auth/react"
import { createContext, useState, useEffect } from "react"
import { MenuItem } from "../menu-items/page"

type cartContextType = {
    cart: MenuItem[],
    addToCart: (item: MenuItem) => void,
    removeFromCart: (id: string) => void
}

export const cartContext = createContext<cartContextType | null>(null)

const SessionProvider = ({ children }: { children: React.ReactNode }) => {

    const [cart, setCart] = useState<MenuItem[]>([])
    const ls = typeof window !== "undefined" ? window.localStorage : null

    const addToCart = (item: MenuItem) => {
        setCart(prev => {
            const newCart = [...prev, item]
            if (ls) {
                ls.setItem('cart', JSON.stringify(newCart));
            }
            return newCart
        })
    }

    const removeFromCart = (id: string) => {
        setCart(prev => {
            const newCart = prev.filter(pv => pv._id !== id)
            if (ls) {
                ls.setItem('cart', JSON.stringify(newCart))
            }
            return newCart
        })
    }


    useEffect(() => {
        if (ls) {
            const storedCart = ls.getItem('cart');
            if (storedCart) {
                setCart(JSON.parse(storedCart));
            }
        }
    }, []);

    return (
        <Provider>
            <cartContext.Provider value={{ cart, addToCart, removeFromCart }}>
                {children}
            </cartContext.Provider>
        </Provider>
    )
}

export default SessionProvider