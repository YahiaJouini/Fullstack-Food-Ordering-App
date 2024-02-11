import Image from "next/image"

const page = () => {
    return (
        <section className="mt-14">

            <h1 className="text-center text-primary font-bold text-4xl mb-4">Register
            </h1>


            <form className="max-w-xs mx-auto">
                <input
                    type="email" placeholder="email" />
                <input
                    type="password" placeholder="Password" />
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