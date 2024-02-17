import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import ProfileForm from "../components/layout/ProfileForm"

const profilePage = async () => {
    const session = await getServerSession()
    if (!session?.user) {
        redirect('/login')
    }
    return (
        <section className='mt-20'>
            <ProfileForm />
        </section>
    )
}

export default profilePage