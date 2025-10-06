import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { addToCartApi, viewAProductApi } from '../../services/allApi'
import { useParams } from 'react-router-dom'

function ViewProduct() {
  const [viewProductDetails, setviewProductDetails] = useState({})
  const { id } = useParams()

  const viewAProduct = async (id) => {
    const result = await viewAProductApi(id)
    if (result.status === 200) {
      setviewProductDetails(result.data)
    }
  }

  const handleAddToCart = async () => {
    const user = JSON.parse(sessionStorage.getItem("existingUser")) // Assumes login info is saved in localStorage
    if (!user || !user._id) {
      alert("Please login to add to cart")
      return
    }

    const reqBody = {
      userId: user._id,
      productId: viewProductDetails._id
    }

    const result = await addToCartApi(reqBody)
    if (result?.status === 200) {
      alert("Added to cart!")
    } else {
      alert("Failed to add to cart.")
    }
  }




  useEffect(() => {
    viewAProduct(id)
  }, [id])

  return (
    <>
      <Header />
      <div className="min-h-screen overflow-y-auto bg-white md:mt-20 mt-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left - Image */}
            <div className="flex justify-center">
              <img
                src={viewProductDetails.imageurl}
                alt={viewProductDetails.productName}
                className="rounded-lg shadow-md w-full max-w-sm md:max-w-full object-cover"
              />
            </div>

            {/* Right - Product Info */}
            <div className="flex flex-col justify-start space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">{viewProductDetails.productName}</h2>

              {/* Price */}
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-red-600 text-xl md:text-2xl font-bold">Rs. {viewProductDetails.dprice}</p>
                <p className="text-gray-500 line-through text-lg md:text-xl">Rs. {viewProductDetails.price}</p>
                <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
                  -19%
                </span>
              </div>

              {/* Weight */}
              <div>
                <span className="bg-yellow-400 text-black text-sm font-medium px-3 py-2 rounded-full">
                 {viewProductDetails.netQuantity}
                </span>
              </div>

              {/* Highlights */}
              {/* <div className="flex flex-wrap gap-4 text-sm text-gray-700 font-semibold">
                <div className="flex items-center gap-2">
                  <img src="/icons/delivery.png" alt="Delivery" className="w-5 h-5" />
                  Order by 10 PM
                </div>
                <div className="flex items-center gap-2">
                  <img src="/icons/secure.png" alt="Secure" className="w-5 h-5" />
                  100% Secure
                </div>
                <div className="flex items-center gap-2">
                  <img src="/icons/free-delivery.png" alt="Free Delivery" className="w-5 h-5" />
                  Free Delivery
                </div>
                <div className="flex items-center gap-2">
                  <img src="/icons/guarantee.png" alt="Guarantee" className="w-5 h-5" />
                  Quality Guarantee
                </div>
              </div> */}

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="bg-green-700 hover:bg-green-800 text-white py-3 px-5 rounded-full text-center transition">
                <i className="fas fa-shopping-cart mr-2"></i> Add to Cart
              </button>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-1">Product Description</h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  {viewProductDetails.description || "No description available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewProduct
