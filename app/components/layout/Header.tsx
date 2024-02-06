import Link from "next/link";
const Header = () => {
    return (
        <header className="flex  items-center justify-between">
            <Link className="font-bold text-2xl text-primary" href="">ST PIZZA</Link>
            <nav className="flex gap-x-8 text-gray-500 font-bold items-center">
                <Link href={""}>Home</Link>
                <Link href={""}>Menu</Link>
                <Link href={""}>About</Link>
                <Link href={""}>Contact</Link>
                <Link href={""} className="bg-primary text-white px-8 rounded-full py-2">Login</Link>
            </nav>
        </header>
    )
}

export default Header