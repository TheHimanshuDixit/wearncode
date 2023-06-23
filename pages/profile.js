import React, { useEffect } from 'react'
import router from 'next/router'

const Profile = () => {

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            router.push('/login')
        }
    }, [])


    return (
        <div>Profile</div>
    )
}

export default Profile