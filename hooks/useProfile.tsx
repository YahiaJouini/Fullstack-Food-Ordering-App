import { useEffect, useState } from "react"
type profileType = {
    email: string,
    admin: boolean
}
const useProfile = () => {

    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState<profileType>({
        email: "",
        admin: false
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
        fetchProfile()
    }, [])
    return { loading, profile }
}

export default useProfile