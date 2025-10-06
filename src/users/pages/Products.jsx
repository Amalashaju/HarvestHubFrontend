import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { getAllProductApi } from '../../services/allApi'

function Products() {

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
      <Header />

      {token && <div className="bg-cream min-h-screen text-[#1B4332] bg-white">
        <main className="px-10 py-8">
          <h1 className="text-3xl font-bold text-center mb-2">Explore HarvestHub</h1>
          <p className="text-center text-gray-600 mb-6">
            Discover fresh, organic produce delivered to your doorstep.
          </p>

          {/* Search Input */}
          <div className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-1/2 px-4 py-2 border rounded-full shadow-sm focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-6 mb-8 flex-wrap">
            <select className="px-4 py-2 border rounded-md">
              <option>Price</option>
              <option>Low to High</option>
              <option>High to Low</option>
            </select>
            <select className="px-4 py-2 border rounded-md">
              <option>Category</option>
              <option>Leafy Greens</option>
              <option>Root Vegetables</option>
            </select>
            <select className="px-4 py-2 border rounded-md">
              <option>Rating</option>
              <option>5 Stars</option>
              <option>4 Stars & up</option>
            </select>
          </div>

          {/* Categories */}
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="rounded overflow-hidden shadow-md">
              <img
                src="https://media.istockphoto.com/id/114338364/photo/dark-green-leafy-vegetables.webp?b=1&s=612x612&w=0&k=20&c=XgCsckVmf_IANSA_2l2n_p8eGmB7B2PvmUX14z0Bslw="
                alt="Leafy Greens"
                className="w-full h-32 object-cover"
              />
              <p className="text-center p-2 font-medium">Leafy Greens</p>
            </div>

            <div className="rounded overflow-hidden shadow-md">
              <img
                src="https://cdn.pixabay.com/photo/2020/09/12/21/14/tomatoes-5566744_1280.jpg"
                alt="Fruiting Vegetables"
                className="w-full h-32 object-cover"
              />
              <p className="text-center p-2 font-medium">Fruiting Vegetables</p>
            </div>
            <div className="rounded overflow-hidden shadow-md">
              <img
                src="https://cdn.pixabay.com/photo/2022/07/04/10/45/garden-radish-7300875_1280.jpg"
                alt="Root Vegetables"
                className="w-full h-32 object-cover"
              />
              <p className="text-center p-2 font-medium">Root Vegetables</p>
            </div>
            <div className="rounded overflow-hidden shadow-md">
              <img
                src="https://cdn.pixabay.com/photo/2013/02/21/19/12/garlic-84691_1280.jpg"
                alt="Bulb Vegetables"
                className="w-full h-32 object-cover"
              />
              <p className="text-center p-2 font-medium">Bulb Vegetables</p>
            </div>
          </div>

          {/* Popular Products */}
          <h2 className="text-2xl text-center font-semibold mb-4">Popular Products</h2>
          <div className="mx-auto px-2 sm:px-4 md:px-6 max-w-screen-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-8 mb-8">
              {
                allProduct?.length > 0 ?
                  allProduct.map((item) => (
                    <div className="bg-white rounded shadow-md overflow-hidden w-full max-w-sm mx-auto">
                    <Link to={`/view-product/${item?._id}`}>
                        <img
                          src={item.imageurl}
                          alt={item.productName}
                          className="w-full h-48 object-cover"
                        />
                    </Link>
                      <div className="p-4">
                        <p className="font-medium mb-1">{item.productName}</p>
                        <p className="text-black  mb-1">Rs. {item.description.slice(0,32)}...</p>
                        <div className='flex justify-between items-center'>
                          <p className="text-amber-400 text-xl  mb-2">Rs. {item.dprice}</p>
                          <p className="text-gray-500 line-through text-xl">Rs. {item.price}</p>
                          
                        </div>
                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  )) : <p>No Products</p>
              }
            </div>
          </div>

        </main>
      </div>}

      {!token && <div className="grid grid-cols-3">
        <div></div>
        <div className='flex justify-center items-center flex-col'>
          <img src="https://i.pinimg.com/originals/eb/17/d0/eb17d0925c49ef13af6e84cdfeaad079.gif" alt="" />
          <p className='mt-3 text-2xl'>Please <Link to={'/login'}>Login</Link> To Explore</p>
        </div>
      </div>}

      <Footer />
    </>
  )
}

export default Products
