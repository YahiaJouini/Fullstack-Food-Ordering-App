import { useEffect, useState } from "react"
type profileType = {
    email: string,
    admin: boolean
}
import { useSearchParams } from "next/navigation";
const useProfile = () => {
    const query = useSearchParams()
    const admin = query.get('admin')


    const [loading, setLoading] = useState(admin !== 'true')
    const [profile, setProfile] = useState<profileType>({
        email: "",
        admin: admin === 'true'
    })


    const fetchProfile = async () => {
        const data = await fetch('/api/profile', {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        if (data.ok) {
            const profileData = await data.json()
            setProfile({ email: profileData.user.email, admin: profileData.user.admin })
        }
        setLoading(false)
    }


    useEffect(() => {
        if (!admin) {
            fetchProfile()
        }
    }, [])
    return { loading, profile }
}

export default useProfile