"use client"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LoadinSpinner from "../components/layout/loadingText"

type errorsType = {
    email: string,
    password: string,
    server: string,
}
const registerPage = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "authenticated") router.push('/')
    }, [router, status])
    const [userCreated, setUserCreated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<null | errorsType>(null)

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const response = await fetch('/api/register',
            {
                method: 'POST',
                body: JSON.stringify({ email: formData.email, password: formData.password }),
                headers: { 'Content-type': 'application/json' }
            }
        )
        if (response.ok) {
            setUserCreated(true)
            setErrors(null)
            setFormData({
                email: "",
                password: ""
            })
        } else {
            const { error } = await response.json()
            switch (response.status) {
                case 401:
                    setErrors({ email: error.email, password: error.password, server: "" });
                    break;
                default:
                    setErrors({ email: "", password: "", server: "error" });
            }
        }
        setLoading(false)

    }

    const googleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await signIn('google', { callbackUrl: "/" })
    }

    if (status === "loading" || status === "authenticated") {
        return <LoadinSpinner />
    }
    return (
        <section className="mt-14">
            <div>
                <h1 className="text-center text-primary font-bold text-4xl mb-4">
                    Register
                </h1>
                {userCreated && (
                    <div className="my-4 text-center">
                        User created.<br />
                        Now you can <Link className="underline text-blue-600 font-medium text-[1.1em]" href="/login">login</Link>
                    </div>
                )}
                {errors && (
                    <div className="my-4 text-center text-primary font-semibold text-xl">
                        <p className="mb-2">{errors.email}</p>
                        <p className="mb-2">{errors.password}</p>
                        <p className="mb-2">{errors.server}</p>
                    </div>
                )}
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
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={HandleChange}
                        value={formData.password}
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        Register
                    </button>
                    <p className="my-4 text-center text-gray-500">or login with a provider</p>
                    <button
                        className="flex items-center justify-center gap-x-4"
                        disabled={loading}
                        onClick={googleSubmit}
                    >
                        <Image src="/google.png" width={26} height={26} alt="Google icon" />
                        Login with Google
                    </button>
                    <div className="text-center pt-4">
                        Already have an account? <Link className="underline text-blue-600 font-medium text-[1.1em]" href="/login">Login</Link>
                    </div>
                </form>
            </div>
        </section>

    )
}

export default registerPage