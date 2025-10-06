// src/components/CartSidebar.jsx
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { getCartApi } from "../../services/allApi";
import { Link } from 'react-router-dom';


function CartSidebar({ onClose }) {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('existingUser'))
        if (user?._id) {
            getCartApi(user._id).then(res => {
                if (res.status === 200) {
                    setCartItems(res.data)
                }
            })
        }
    }, [])

    // Calculate total price
    const totalAmount = cartItems.reduce((total, item) => {
        return total + (item.productId?.dprice || 0) * (item.quantity || 1)
    }, 0)

    return (
        <>
            {/* Overlay */}
            <div className='fixed inset-0 bg-gray-500/25 transition-opacity w-full h-full' onClick={onClose}></div>

            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-screen w-80 bg-white flex flex-col justify-between shadow-lg z-50">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Your cart <span className="text-gray-500">({cartItems.length})</span></h2>
                    <FontAwesomeIcon onClick={onClose} icon={faXmark} className="cursor-pointer" />
                </div>

                <div className="p-4 flex-1 overflow-y-auto">
                    {cartItems.length > 0 ? cartItems.map((item, index) => (
                        <div key={index} className="flex items-start justify-between mb-6">
                            <img
                                src={item.productId?.imageurl}
                                alt={item.productId?.productName}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div className="ml-3 flex-1">
                                <h3 className="text-sm font-semibold">{item.productId?.productName}</h3>
                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                <p className="font-bold mt-1 text-sm">₹{item.productId?.dprice * item.quantity}</p>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center text-gray-500">Cart is empty</p>
                    )}
                </div>

                <div className="border-t p-4">
                    <div className="flex items-center justify-between">
                        <Link to={'/cart-page'}>
                            <button className="bg-green-700 text-white text-sm px-5 py-2 rounded-full hover:bg-green-800">
                                Proceed
                            </button>
                        </Link>
                        <span className="text-sm font-semibold">Total: ₹{totalAmount}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartSidebar
