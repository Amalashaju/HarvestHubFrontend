import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { loginApi } from '../services/allApi';

function Login() {

    const [userDetails, setuserDetails] = useState({
        email: "",
        password: ""
    })
    console.log(userDetails);

    const navigate = useNavigate()

    
    


    const handleLogin = async () => {
        const { email, password } = userDetails;
        if (!email || !password) {
            toast.info('please fill the fields completely');
        } else {
            const result = await loginApi({ email, password });  
            console.log(result);

            if (result.status == 200) {
                toast.success('Login successfull');
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser));
                sessionStorage.setItem("token", result.data.token);

                const role = result.data.existingUser.role;

                if (role === 'admin') {
                    navigate('/admin-home');
                } else if (role === 'host') {
                    navigate('/seller-home');
                } else {
                    navigate('/');
                }
            } else if (result.status == 401) {
                toast.warning(result.response.data);
                setuserDetails({
                    username: "",
                    email: "",
                    password: ""
                });
            } else if (result.status == 404) {
                toast.warning("Account doesn't exist");
                setuserDetails({
                    username: "",
                    email: "",
                    password: ""
                });
            } else {
                toast.error('something went wrong');
                setuserDetails({
                    username: "",
                    email: "",
                    password: ""
                });
            }
        }
    }

    return (
        <>
            <div className="bg-white min-h-screen flex items-center justify-center">
                <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-xl rounded-xl overflow-hidden">
                    {/* Left Section */}
                    <div
                        className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center bg-green-700"
                        // style={{
                        //     backgroundImage:
                        //         "url('https://img.freepik.com/free-vector/farm-landscape-woman-with-fruit-hands_23-2148418417.jpg?ga=GA1.1.1395436390.1734599681&semt=ais_hybrid&w=740')",
                        // }}
                    ></div>

                    {/* Right Section */}
                    <div className="w-full md:w-1/2 bg-amber-200 flex items-center justify-center md:p-25 ">
                        <div className="w-full max-w-md">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-black mb-1"> Email Address</label>
                                    <input type="email" value={userDetails.email} onChange={(e) => setuserDetails({ ...userDetails, email: e.target.value })} id="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 bg-white" placeholder="Enter your email" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-black mb-1">Password</label>
                                    <input type="password" value={userDetails.password} onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })} id="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 bg-white" placeholder="Enter password" />
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <a href="#" className="text-sm text-green-900 hover:underline">
                                        Forgot password?
                                    </a>
                                </div>

                                <button
                                    type="button" onClick={handleLogin} className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition">Login
                                </button>
                                {/* <button className='bg-white text-black w-full p-3 my-5 rounded '>Sign in with Google</button> */}

                                <p className="text-sm text-center text-gray-600 mt-4">
                                    Are you a New User ?{' '}
                                    <Link to={'/register'}>
                                        <span className="text-green-900 hover:underline">Register</span>
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={3000}></ToastContainer>
        </>
    )
}

export default Login
