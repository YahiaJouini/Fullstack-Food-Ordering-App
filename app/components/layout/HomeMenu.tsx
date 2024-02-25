"use client"
import { useEffect, useState } from "react"
import SectionHeaders from "./SectionHeaders"

import { MenuItem } from "@/app/menu-items/page"
import ItemDisplay from "./ItemDisplay"
import { ClipLoader } from "react-spinners"
const HomeMenu = () => {

  const [bestSeller, setBestSeller] = useState<MenuItem[]>([])
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const fetchMenu = async () => {
    const res = await fetch('/api/menu-item')
    if (!res.ok) {
      setError('Failed to fetch data')
      setLoading(false)
      return
    }
    const data = await res.json()
    setBestSeller(data.slice(-3))
    setLoading(false)
  }
  useEffect(() => {
    fetchMenu()
  }, [])

  const DisplayContent = () => {
    if (loading) return (
      <div className="grid place-content-center">
        <ClipLoader
          color="#d63636"
          size={80}
          speedMultiplier={2}
        />
      </div>

    )
    if (error !== "") return (
      <h1 className="text-lg text-red-500 font-bold text-center">
        {error}
      </h1>
    )

    if (!loading && !error && bestSeller.length === 0) return (
      <h1 className="text-lg text-red-500 font-bold text-center">
        No items to display
      </h1>
    )

    return <ItemDisplay bestSeller={bestSeller} />
  }
  return (
    <section>
      <div className="text-center my-10">
        <SectionHeaders subHeader="CHECK OUR"
          mainHeader="Best Best Sellers"
        />
      </div>
      {DisplayContent()}

    </section>
  )
}

export default HomeMenu