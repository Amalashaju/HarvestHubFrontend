import React, { useEffect, useState } from 'react'
import { getAllProductApi } from '../../services/allApi'
import { ToastContainer } from 'react-toastify'
import Footer from '../../components/Footer'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'
import { Link } from 'react-router-dom'

function AdminViewProducts() {

  const [token, setToken] = useState("")
  const [allProduct, setallProduct] = useState([])

  //get all products
  const getAllProduct = async (tok) => {
    const reqHeader = {
      "Authorization": `Bearer ${tok}`
    }
    const result = await getAllProductApi(reqHeader)
    // console.log(result);
    if (result.status == 200) {
      setallProduct(result.data)
    }
  }
  console.log(allProduct);


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const tok = sessionStorage.getItem("token")
      setToken(tok)
      getAllProduct(tok)
    }
  }, [])

  return (
    <>

      <AdminHeader />
      <div className=' min-h-screen md:grid grid-cols-[1fr_4fr]'>
        <div className='bg-blue-200 flex flex-col items-center p-5'>
          <AdminSidebar />
        </div>
        <div className="mx-auto px-2 sm:px-4 md:px-6 max-w-screen-xl mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-8 mb-8">
            {
              allProduct?.length > 0 ?
                allProduct.map((item) => (
                  <div className="bg-white rounded shadow-md overflow-hidden w-full max-w-sm mx-auto">
                      <img
                        src={item.imageurl}
                        alt={item.productName}
                        className="w-full h-48 object-cover"
                      />
                    <div className="p-4">
                      <p className="font-medium mb-1">{item.productName}</p>
                      <p className="text-black  mb-1">Rs. {item.description.slice(0, 32)}...</p>
                      <div className='flex justify-between items-center'>
                        <p className="text-amber-400 text-xl  mb-2">Rs. {item.dprice}</p>
                        <p className="text-gray-500 line-through text-xl">Rs. {item.price}</p>

                      </div>
                    </div>
                  </div>
                )) : <p>No Products</p>
            }
          </div>
        </div>

      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={1000} />

      <Footer />
    </>
  )
}

export default AdminViewProducts
