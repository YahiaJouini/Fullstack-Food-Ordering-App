import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import ProfileForm from "../components/layout/ProfileForm"

const profilePage = async () => {
    const session = await getServerSession()
    if (!session?.user) {
        redirect('/login')
    }
    return (
        <section className='mt-12'>
            <h1 className="text-center text-primary font-bold text-4xl mb-4">
                Profile
            </h1>
            <ProfileForm/>
        </section>
    )
}

export default profilePage