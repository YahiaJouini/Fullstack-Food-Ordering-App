import { signOut } from "next-auth/react"
import { BeatLoader } from "react-spinners"
const Logout = ({ loading }: { loading?: boolean }) => {
    return (
        <button
            className="bg-primary text-white px-8 rounded-full py-2 border-none w-[120px] h-[40px] flex items-center justify-center"
            onClick={() => signOut()}
        >
            {loading ? <BeatLoader
                color="#ffffff"
                size={8}
                speedMultiplier={2}
            />
                : "Logout "}
        </button>
    )
}

export default Logout