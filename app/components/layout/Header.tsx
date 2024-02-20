"use client"
import Link from "next/link"
import { useSession } from "next-auth/react"
import Logout from "./Logout"
const Header = () => {
  const session = useSession()
  const handleNavDisplay = () => {
    if (session.status === "loading") {
      return <Logout loading={true} />
    } else if (session.status === "authenticated") {
      const { user } = session.data
      const userName = user?.name || user?.email
      return (
        <div className="flex items-center gap-x-6">
          <Link href="/profile">Hello, {userName?.split(" ")[0]}</Link>
          <Logout />
        </div>
      );
    } else {
      return (
        <>
          <Link href={"/login"}>Login</Link>
          <Link
            href={"/register"}
            className="bg-primary border-none text-white px-8 rounded-full py-2"
          >
            Register
          </Link>
        </>
      );
    }
  };
  return (
    <header className="flex  items-center justify-between">
      <nav className="flex gap-x-8 text-gray-500 font-bold items-center">
        <Link className="font-bold text-2xl text-primary mr-10" href="/">
          ST PIZZA
        </Link>
        <Link href={"/"}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
      </nav>

      <nav className="flex gap-x-4 text-gray-500 font-bold items-center">
        {handleNavDisplay()}
      </nav>
    </header>
  );
};

export default Header