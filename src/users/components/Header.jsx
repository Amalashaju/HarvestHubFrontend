import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartSidebar from './CartSidebar'
import { userProfileUpdateStatusContext } from '../../../context/Contextshare'
import { serverUrl } from '../../services/serverUrl'

function Header() {
    const [status, setStatus] = useState(false)
    const [offCanvasStatus, setOffCanvasStatus] = useState(false)
    const [token, setToken] = useState("")
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: "",
        profile: ""
      })
    const { userProfileUpdateStatus } = useContext(userProfileUpdateStatusContext)

   useEffect(() => {
    const token = sessionStorage.getItem('token')
    setToken(token)

    const userData = JSON.parse(sessionStorage.getItem("existingUser"))
    if (userData) {
        setUser({
            username: userData.username,
            profile: userData.profile
        })
    }
}, [userProfileUpdateStatus])


    const logout = () => {
        sessionStorage.removeItem('existingUser')
        sessionStorage.removeItem('token')
        navigate('/')
    }

    return (
        <>
            <div className='md:grid grid-cols-3 p-3 bg-green-900 shadow-md'>
                {/* Logo & Title */}
                <div className='flex items-center'>
                    <img src="https://png.pngtree.com/png-vector/20230420/ourmid/pngtree-green-leaf-icon-design-template-vector-image_6710581.png"
                        alt=""
                        style={{ width: '80px', height: '80px' }} />
                    <h1 className='text-2xl ms-2 text-white font-bold'>HarvestHub</h1>
                </div>

                {/* Mobile Icons */}
                <div className='flex justify-between items-center md:hidden'>
                    <span onClick={() => setStatus(!status)} className='text-2xl'>
                        <FontAwesomeIcon icon={faBars} className="text-white" />
                    </span>
                    {!token ? (
                        <Link to={'/login'}>
                            <button className='border border-yellow-100 rounded px-3 py-2 text-white ms-4'>Login</button>
                        </Link>
                    ) : (
                        // <div>
                        //     <FontAwesomeIcon icon={faCartShopping} onClick={() => setOffCanvasStatus(true)} className="me-3 text-white fa-lg" />
                        //     <button onClick={logout} className='border border-yellow-100 rounded px-3 py-2 text-white ms-4'>Logout</button>
                        //     <img
                        //         src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        //         alt="Profile"
                        //         className="w-10 h-10 rounded-full"
                        //     />
                        // </div>

                        <div className="flex justify-end items-center gap-4 w-full">
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                onClick={() => setOffCanvasStatus(true)}
                                className="text-white fa-lg cursor-pointer"
                            />
                            <button
                                onClick={logout}
                                className="border border-yellow-100 rounded px-3 py-2 text-white"
                            >
                                Logoutt
                            </button>
                            <Link to={'/user-profile'}>
                                {/* <img
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full"
                                /> */}
                                <img
                                    src={user?.profile ? `${serverUrl}/upload/${user.profile}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full"
                                />

                            </Link>
                        </div>
                    )}
                </div>

                {/* Nav Links */}
                <div className='p-5 md:flex text-white text-xl justify-center items-center'>
                    <ul className={status ? 'md:flex' : 'md:flex justify-center hidden'}>
                        <Link to={'/'}><li className='md:mx-4 md:mt-2'>Home</li></Link>
                        <Link to={'/products'}><li className='md:mx-4 mt-2'>Products</li></Link>
                        <li className='md:mx-3 mt-2'>About Us</li>
                        <li className='md:mx-4 mt-2'>Contact</li>
                    </ul>
                </div>

                {/* Desktop Right Buttons */}
                <div className='md:flex justify-end items-center hidden'>
                    {!token ? (
                        <Link to={'/login'}>
                            <button className='border border-yellow-100 rounded px-3 py-2 text-white ms-4'>Login</button>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-4">
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                onClick={() => setOffCanvasStatus(true)}
                                className="text-white fa-lg cursor-pointer"
                            />
                            <button onClick={logout} className='border border-yellow-100 rounded px-3 py-2 text-white'>
                                Logout
                            </button>
                            <Link to={'/user-profile'}>
                                {/* <img
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full"
                                /> */}
                                  <img
                                    src={user?.profile ? `${serverUrl}/upload/${user.profile}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full"
                                />
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Cart Sidebar */}
            {offCanvasStatus && (
                <CartSidebar onClose={() => setOffCanvasStatus(false)} />
            )}
        </>
    )
}

export default Header
