"use client"
import { SessionProvider as Provider } from "next-auth/react"
import { createContext, useState, useEffect } from "react"
import { MenuItem } from "../menu-items/page"

type cartContextType = {
    cart: MenuItem[],
    addToCart: (item: MenuItem) => void,
}

export const cartContext = createContext<cartContextType | null>(null)

const SessionProvider = ({ children }: { children: React.ReactNode }) => {

    const [cart, setCart] = useState<MenuItem[]>([])

    const addToCart = (item: MenuItem) => {
        setCart(prev => ([...prev, item]))
    }

    return (
        <Provider>
            <cartContext.Provider value={{ cart, addToCart }}>
                {children}
            </cartContext.Provider>
        </Provider>
    )
}

export default SessionProvider