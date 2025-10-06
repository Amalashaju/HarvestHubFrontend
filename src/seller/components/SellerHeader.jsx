import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'


function SellerHeader() {
    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.removeItem('existingUser')
        sessionStorage.removeItem('token')
        navigate('/')
    }
    return (
        <>
            <div className="flex justify-between px-20 shadow p-3 bg-amber-200">
                <div className="flex items-center">

                    <h1 className="ms-3 font-medium text-2xl"><span role="img" aria-label="logo"></span>HarvestHub</h1>
                </div>

                <button onClick={logout} className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white">
                    <FontAwesomeIcon icon={faPowerOff} className="me-3" />
                    logout
                </button>
            </div>

            {/* <marquee behavior="" direction="left" className="p-3 bg-gray-900 text-white">
                    <p>Welcome, [Admin]! You're all set to manage and monitor the system. Let's get to work!</p>
                </marquee> */}

        </>
    )
}

export default SellerHeader
