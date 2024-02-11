import Link from "next/link";
const Header = () => {
    return (
        <header className="flex  items-center justify-between">
            <nav className="flex gap-x-8 text-gray-500 font-bold items-center">
                <Link className="font-bold text-2xl text-primary" href="">ST PIZZA</Link>
                <Link href={"/"}>Home</Link>
                <Link href={""}>Menu</Link>
                <Link href={""}>About</Link>
                <Link href={""}>Contact</Link>
            </nav>

            <nav className="flex gap-x-4 text-gray-500 font-bold items-center">
                <Link href={"/login"}>Login</Link>

                <Link href={"/register"} className="bg-primary text-white px-8 rounded-full py-2">Register</Link>

            </nav>
        </header>
    )
}

export default Header