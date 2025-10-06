import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { updateUserProfileApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'


function Profile() {

    const [preview, setPreview] = useState("")
    const [token, settoken] = useState("")
    const [existingProfileImage, setExistingProfileImage] = useState("")
    const [updateStatus, setupdateStatus] = useState({})
    const [userDetails, setUserDeatils] = useState({

        username: "",
        password: "",
        cPassword: "",
        profile: ""
    })
    console.log(userDetails);


    const handleFileAdd = (e) => {
        // console.log(e.target.files[0]);
        setUserDeatils({ ...userDetails, profile: e.target.files[0] })
        if (e.target.files[0] != "") {
            const url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }
    console.log(preview);


    //reset function
    const handleReset = () => {
        setUserDeatils({
            username: "",
            password: "",
            cPassword: "",
            profile: "",
            bio: ""
        })
        setPreview("")
    }

    const handleAdd = async () => {
        const { username, password, cPassword, profile } = userDetails
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

                    for (let key in userDetails) {
                        reqBody.append(key, userDetails[key])
                    }
                    const reqHeader = {
                        "Authorization": `Bearer ${token}`
                    }
                    const result = await updateUserProfileApi(reqBody, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        toast.success('Pofile updated successfully')
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setupdateStatus(result.data)
                        // setuserProfileUpdateStatus(result.data)

                    }
                    else {
                        toast.error('Something went wrong')
                        setupdateStatus({result})
                        // setuserProfileUpdateStatus(result)
                    }
                }
                else {
                    const reqHeader = {
                        "Authorization": `Bearer ${token}`
                    }
                    const result = await updateUserProfileApi({ username, password, profile: existingProfileImage }, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        toast.success('Pofile updated successfully')
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setupdateStatus(result.data)
                        // setuserProfileUpdateStatus(result.data)

                    }
                    else {
                        toast.error('Something went wrong')
                        setupdateStatus({result})
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
            setUserDeatils({ username: user.username, password: user.password, cPassword: user.password })
            setExistingProfileImage(user.profile)
        }
    }, [updateStatus])


    return (
        <>
            <Header />
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
                    <input value={userDetails.username} onChange={(e) => setUserDeatils({ ...userDetails, username: e.target.value })}
                        type="text"
                        placeholder="Username"

                        className="w-full border p-2 rounded mb-8"
                    />
                    <input value={userDetails.password} onChange={(e) => setUserDeatils({ ...userDetails, password: e.target.value })}
                        type="text"
                        placeholder="Password"

                        className="w-full border p-2 rounded mb-8"
                    />
                    <input value={userDetails.cPassword} onChange={(e) => setUserDeatils({ ...userDetails, cPassword: e.target.value })}
                        type="text"
                        placeholder="cPassword"

                        className="w-full border p-2 rounded mb-8"
                    />


                    {/* Buttons */}
                    <div className="flex justify-between w-full">
                        <button type='button' onClick={handleReset} className="bg-orange-600 text-white px-4 py-2 rounded">
                            Reset
                        </button>
                        <button type='button' onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded">
                            Update
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={1000} />

        </>



    )

}
export default Profile
