"use client"
import Image from "next/image"
import { useState } from "react"

const page = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res = await fetch('/api/register',
                {
                    method: 'POST',
                    body: JSON.stringify({ email:formData.email,password:formData.password }),
                    headers: { 'Content-type': 'application/json' }
                }
            )
            const res2 = await res.json()
            console.log(res2)
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <section className="mt-14">

            <h1 className="text-center text-primary font-bold text-4xl mb-4">Register
            </h1>


            <form
                className="max-w-xs mx-auto"
                onSubmit={HandleSubmit}

            >
                <input
                    type="email"
                    placeholder="email"
                    value={formData.email}
                    name="email"
                    onChange={HandleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={HandleChange}

                />
                <button type="submit">
                    Register
                </button>
                <p className="my-4 text-center text-gray-500">Or login with provider</p>
                <button className="flex items-center justify-center gap-x-4">
                    <Image src="/google.png"
                        width={26}
                        height={26}
                        alt="Google icon" />
                    Login with google
                </button>
            </form>

        </section>
    )
}

export default page