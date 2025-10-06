import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { registerApi } from '../services/allApi';

function Register() {


  const [userDetails, setuserDetails] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  })
  const navigate = useNavigate()
  console.log(userDetails);

  const handleRegister = async () => {
    console.log('inside register function');
    const { username, email, password, role } = userDetails
    if (!username || !email || !password || !role) {
      toast.info('please fill the complete details')
    }
    else {
      const result = await registerApi({ username, email, password, role })
      console.log(result);
      if (result.status == 200) {
        toast.success('Register successfuly')
        setuserDetails({
          username: "",
          email: "",
          password: "",
          role: ""
        })
        navigate('/login')
      }
      else if (result.status == 409) {
        toast.warning(result.response.data)
        setuserDetails({
          username: "",
          email: "",
          password: "",
          role: ""
        })

      }
      else {
        toast.error('something went wrong')
        setuserDetails({
          username: "",
          email: "",
          password: "",
          role: ""
        })
      }



    }
  }


  return (
    <>
      <div className="bg-amber-100 min-h-screen flex items-center justify-center">
        <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-xl rounded-xl overflow-hidden">
          {/* Left Section */}
          <div
            className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-vector/organic-farming-concept_23-2148440823.jpg?ga=GA1.1.1395436390.1734599681&semt=ais_hybrid&w=740')",
            }}
          ></div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 bg-amber-200 flex items-center justify-center md:p-18 ">
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-black mb-1">User Name</label>
                  <input value={userDetails.username} onChange={(e) => setuserDetails({ ...userDetails, username: e.target.value })} type="text" id="username" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700  bg-white" placeholder="Enter Username" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-black mb-1"> Email Address</label>
                  <input type="email" value={userDetails.email} onChange={(e) => setuserDetails({ ...userDetails, email: e.target.value })} id="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 bg-white" placeholder="Enter your email" />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-black mb-1">Password</label>
                  <input type="password" value={userDetails.password} onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })} id="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 bg-white" placeholder="Enter password" />
                </div>

                <div className="mb-4">
                  <label  htmlFor="password" className="block text-black mb-1">role</label>
                  <select value={userDetails.role} onChange={(e) => setuserDetails({ ...userDetails, role: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 bg-white" >
                    <option value="" disabled selected>select</option>
                    <option value="host">Host</option>
                    <option value="user">User</option>
                  </select>
                </div>


                <button type="button" onClick={handleRegister} className="w-full bg-green-700 text-2xl text-white py-2 rounded-lg hover:bg-green-800 transition">Register</button>

                <p className="text-sm text-center text-gray-600 mt-4">
                  Already have an account?{' '}
                  <Link to={'/login'}>
                    <span className="text-green-900 hover:underline">Login</span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={3000} />
    </>
  );
}

export default Register;
