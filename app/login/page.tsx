"use client"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import LoadinSpinner from "../components/layout/loadingText"

type errorsType = {
    global: string,
}
const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<null | errorsType>(null)
    const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "authenticated") {
            router.refresh()
            router.push("/")
        }
    }, [router, status])

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const { email, password } = formData
        if (email === "" || password === "") {
            setErrors({ global: "All fields are required" })
            setLoading(false)
        }
        else {
            setErrors({ global: "" })
            const res = await signIn('credentials', {
                callbackUrl: "/",
                redirect: false,
                email,
                password,
            })
            if (res?.error) {
                setErrors({ global: "Invalid email or password" })
                setLoading(false)
            }
        }
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
                    Login
                </h1>
                {errors && (
                    <div className="my-4 text-center text-primary font-semibold text-xl">
                        <p className="mb-2">{errors.global}</p>
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
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        Login
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
                        Don&apos;t have an account?
                        <Link
                            className="underline text-blue-600 font-medium text-[1.1em]"
                            href="/register"
                        >
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default LoginPage