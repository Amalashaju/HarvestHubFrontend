import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { updateAdminProfileApi, updatSellerProfileApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'
import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { adminProfileUpdateStatusContext } from '../../../context/Contextshare'


function AdminProfile() {

    const [preview, setPreview] = useState("")
    const [token, settoken] = useState("")
    const [existingProfileImage, setExistingProfileImage] = useState("")
    const [updateStatus, setupdateStatus] = useState({})
    const { setadminProfileUpdateStatus } = useContext(adminProfileUpdateStatusContext)
    const [adminDetails, setadminDeatils] = useState({
        username: "",
        password: "",
        cPassword: "",
        profile: ""
    })
    console.log(adminDetails);


    const handleFileAdd = (e) => {
        // console.log(e.target.files[0]);
        setadminDeatils({ ...adminDetails, profile: e.target.files[0] })
        if (e.target.files[0] != "") {
            const url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }
    console.log(preview);

    const handleReset = () => {
        if (sessionStorage.getItem("token")) {
            // const token = sessionStorage.getItem("token")
            // settoken(token)
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setadminDeatils({ username: user.username, password: user.password, cPassword: user.password })
            setExistingProfileImage(user.profile)
        }
        setPreview("")
    }


    const handleAdd = async () => {
        const { username, password, cPassword, profile } = adminDetails
        console.log(username, password, cPassword, profile);
        if (!username || !password || !cPassword) {
            toast.info('please add complete details')
        }
        else {
            if (password != cPassword) {
                toast.warning('password must match')
            }
            else {
                if (preview) {
                    const reqBody = new FormData()

                    for (let key in adminDetails) {
                        reqBody.append(key, adminDetails[key])
                    }
                    const reqHeader = {
                        "Authorization": `Bearer ${token}`
                    }
                    const result = await updateAdminProfileApi(reqBody, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        toast.success('Pofile updated successfully')
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setupdateStatus(result.data)
                        setadminProfileUpdateStatus(result.data)

                    }
                    else {
                        toast.error('Something went wrong')
                        setupdateStatus({ result })
                        // setuserProfileUpdateStatus(result)
                    }

                }
                else {
                    const reqHeader = {
                        "Authorization": `Bearer ${token}`
                    }
                    const result = await updateAdminProfileApi({ username, password, profile: existingProfileImage }, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        toast.success('Pofile updated successfully')
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setupdateStatus(result.data)
                        setadminProfileUpdateStatus(result.data)

                    }
                    else {
                        toast.error('Something went wrong')
                        setupdateStatus({ result })
                        // setuserProfileUpdateStatus(result)
                    }
                }
            }
        }
    }


    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            settoken(token)
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setadminDeatils({ username: user.username, password: user.password, cPassword: user.password })
            setExistingProfileImage(user.profile)
        }
    }, [updateStatus])

    return (
        <>

            <AdminHeader />
            <div className=' min-h-screen md:grid grid-cols-[1fr_4fr] '>
                <div className='bg-blue-200 flex flex-col items-center p-5'>
                    <AdminSidebar />
                </div>
                <div className="w-[400px] h-[550px] mx-auto mt-10 border rounded shadow-lg bg-white">
                    {/* Header */}
                    <div className="bg-green-800 text-white p-3   rounded-t">
                        <h2 className="text-lg text-center  ">Edit User Profile</h2>

                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col items-center">
                        {/* Image and Edit Button */}
                        <div className="relative mb-10">
                            <label htmlFor="profilefile" className="relative cursor-pointer">
                                <input type="file" id="profilefile" style={{ display: "none" }} onChange={(e) => handleFileAdd(e)} />
                                {existingProfileImage == "" ? <img
                                    src={preview ? preview : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                    alt="no image"
                                    className="w-30 h-30 bg-gray-200 rounded-full object-cover"
                                /> :
                                    <img
                                        src={preview ? preview : `${serverUrl}/upload/${existingProfileImage}`}
                                        alt="no image"
                                        className="w-30 h-30 bg-gray-200 rounded-full object-cover"
                                    />}

                                <button className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full">
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                            </label>
                        </div>

                        {/* Input Fields */}
                        <input value={adminDetails.username} onChange={(e) => setadminDeatils({ ...adminDetails, username: e.target.value })}
                            type="text"
                            placeholder="Username"

                            className="w-full border p-2 rounded mb-8"
                        />
                        <input value={adminDetails.password} onChange={(e) => setadminDeatils({ ...adminDetails, password: e.target.value })}
                            type="text"
                            placeholder="Password"

                            className="w-full border p-2 rounded mb-8"
                        />
                        <input value={adminDetails.cPassword} onChange={(e) => setadminDeatils({ ...adminDetails, cPassword: e.target.value })}
                            type="text"
                            placeholder="cPassword"

                            className="w-full border p-2 rounded mb-8"
                        />


                        {/* Buttons */}
                        <div className="flex justify-between w-full">
                            <button onClick={handleReset} className="bg-orange-600 text-white px-4 py-2 rounded">
                                Reset
                            </button>
                            <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded">
                                Update
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={1000} />

            <Footer />
        </>



    )
}

export default AdminProfile
