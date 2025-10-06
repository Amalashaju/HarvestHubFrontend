// src/users/pages/CartPage.jsx
import React, { useEffect, useState } from 'react';
import { clearCartApi, getCartApi, makePaymentApi } from '../../services/allApi';
import Header from './Header';
// import { FaTrash, FaSync } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { loadStripe } from '@stripe/stripe-js';


function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [modalstatus, setmodalstatus] = useState(false)
    const [token, setToken] = useState("")
    const [bookingDetails, setBookingDetails] = useState({
        username: "",
        address: ""
    })
    console.log(bookingDetails);
    console.log(cartItems);

    const handleReset = () => {
        setBookingDetails({
            username: "",
            address: ""
        })
    }
    //open modal
    const openModal = () => {
        setmodalstatus(true)
    }

    //function to make payment

    //  const makePayment = async()=>{
    //     console.log(bookingDetails);
    //     const {username,address}=bookingDetails
    //     console.log(username,address);

    //     const stripe = await loadStripe('pk_test_51RSxzGGa0IMqvz7QEMy9ivgcgqvM3wI2r6owpoICnS0ZbPYjJIKu4PgaCee5Iu9kcKCuIWLUa3kPsP86Lby3u8mV00amkJ8yKR');

    //     if(!username || !address){
    //         alert('Please fill the fields completely')

    //     }
    //     else{
    //         const reqBody ={
    //             productId:cartItems._id, sellerMail:cartItems.userMail, username:bookingDetails.username, address:bookingDetails.address, noofItems:cartItems, totalAmount
    //         }
    //     }




    //  }

    // const makePayment = async () => {
    //     const user = JSON.parse(sessionStorage.getItem("existingUser"));

    //     const { username, address } = bookingDetails;

    //     const stripe = await loadStripe('pk_test_51RSxzGGa0IMqvz7QEMy9ivgcgqvM3wI2r6owpoICnS0ZbPYjJIKu4PgaCee5Iu9kcKCuIWLUa3kPsP86Lby3u8mV00amkJ8yKR');

    //     if (!username || !address) {
    //         alert('Please fill all fields.');
    //         return;
    //     }
    //     else {
    //         const totalAmount = cartItems.reduce((sum, item) => {
    //             return sum + (item.productId?.dprice || 0) * (item.quantity || 1);
    //         }, 0);
    //         const items = cartItems.map(item => ({
    //             productId: item.productId._id,
    //             quantity: item.quantity,
    //             sellerMail: item.productId.userMail,
    //             price: item.productId.dprice,
    //             productName: item.productId.productName
    //         }));
    //         const reqHeader = {
    //             "Authorization": `Bearer ${token}`

    //         }
    //         try {
    //             const clearResult = await clearCartApi(user._id, reqHeader);
    //             console.log("Clear cart result:", clearResult);
    //         } catch (error) {
    //             console.error("Clear cart error:", error);
    //         }
    //         const reqBody = {

    //             username,
    //             address,
    //             items,
    //             totalAmount

    //         }
    //         const result = await makePaymentApi(reqBody, reqHeader)
    //         console.log(result);
    //         const sessionId = result.data.sessionId

            


    //         const response = stripe.redirectToCheckout({
    //             sessionId: sessionId
    //         })

    //         if (response.error) {
    //             alert("Something went wrong during booking!");
    //         }
    //     }


    // }

    const makePayment = async () => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"));
    const { username, address } = bookingDetails;

    const stripe = await loadStripe('pk_test_51RSxzGGa0IMqvz7QEMy9ivgcgqvM3wI2r6owpoICnS0ZbPYjJIKu4PgaCee5Iu9kcKCuIWLUa3kPsP86Lby3u8mV00amkJ8yKR');

    if (!username || !address) {
        alert('Please fill all fields.');
        return;
    }

    const totalAmount = cartItems.reduce((sum, item) => {
        return sum + (item.productId?.dprice || 0) * (item.quantity || 1);
    }, 0);

    const items = cartItems.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        sellerMail: item.productId.userMail,
        price: item.productId.dprice,
        productName: item.productId.productName
    }));

    const reqHeader = {
        "Authorization": `Bearer ${token}`
    };

    const reqBody = {
        username,
        address,
        items,
        totalAmount
    };

    try {
        const result = await makePaymentApi(reqBody, reqHeader);

        // ✅ Only proceed if status is 200 (stock confirmed)
        if (result.status === 200) {
            // 🧹 Clear the cart only after successful stock validation
            const clearResult = await clearCartApi(user._id, reqHeader);
            console.log("Clear cart result:", clearResult);

            const sessionId = result.data.sessionId;

            // 💳 Redirect to Stripe
            const response = await stripe.redirectToCheckout({ sessionId });

            if (response.error) {
                alert("Something went wrong during Stripe checkout.");
            }
        } else {
            alert(result?.data?.error || "Out of Stock.");
        }

    } catch (error) {
        console.error("Booking error:", error);
        if (error.response?.data?.error) {
            alert(error.response.data.error);
        } else {
            alert("Booking failed. Please try again.");
        }
    }
};



    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            setToken(token)
        }
    }, [])


    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('existingUser'));
        if (user?._id) {
            getCartApi(user._id).then(res => {
                if (res.status === 200) {
                    setCartItems(res.data);
                }
            });
        }
    }, []);

    const updateQuantity = (index, change) => {
        setCartItems(prev =>
            prev.map((item, i) =>
                i === index
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const total = cartItems.reduce((sum, item) => {
        return sum + (item.productId?.dprice || 0) * (item.quantity || 1);
    }, 0);

    return (
        <>
            <Header />
            <div className="max-w-4xl mx-auto p-6 md:mt-20 ">
                <h2 className="text-2xl font-semibold mb-4 border-b ">Your Cart ({cartItems.length})</h2>

                <div className="space-y-6 ">
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex items-start justify-between border-b pb-4">
                            <img
                                src={item.productId?.imageurl}
                                alt={item.productId?.productName}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1 ml-4 ">
                                <h3 className="font-semibold">{item.productId?.productName}</h3>
                                <p className="text-sm text-gray-500">{item.productId?.quantity}</p>
                                <div className="mt-2 flex items-center">
                                    <span className="text-lg font-semibold">₹{item.productId?.dprice}</span>
                                    <span className="line-through text-gray-400 text-sm ml-2">₹{item.productId?.price}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-center border rounded-full overflow-hidden">
                                    <button onClick={() => updateQuantity(index, -1)} className="px-3 py-1 bg-gray-200 text-lg">-</button>
                                    <span className="px-4">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(index, 1)} className="px-3 py-1 bg-gray-200 text-lg">+</button>
                                </div>
                                <p className="mt-2 font-semibold">₹{item.productId?.dprice * item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <button onClick={openModal} className="bg-green-700 text-white text-sm px-6 py-3 rounded-full hover:bg-green-800">
                        Proceed
                    </button>
                    <div className="text-xl font-bold">Total: ₹{total}</div>
                </div>
            </div>


            {/* modal for booking */}

            {modalstatus &&
                <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                    <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div class="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                                {/* title */}

                                <div class="bg-amber-500 p-4 flex sm:px-6 justify-between">
                                    <h1 className='text-white text-2xl font-semibold'>Book Now</h1>
                                    <FontAwesomeIcon onClick={() => setmodalstatus(false)} icon={faXmark} className='text-white fa-2x' />
                                </div>

                                {/* body */}
                                <div class="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                                    {/* <p className='font-semibold text-lg'>Fill the form and proceed to pay <span className='text-red-700'>$500</span></p> */}
                                    <div className="grid grid-cols-2">
                                        <div className='p-3'>
                                            <div className="mb-3">
                                                <input type="text" value={bookingDetails.username} placeholder='Full Name' onChange={(e) => setBookingDetails({ ...bookingDetails, username: e.target.value })} className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                                            </div>
                                            {/* <div className="mb-3">
                                            <input type="text"  placeholder='Email Id' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                                        </div> */}

                                        </div>


                                    </div>

                                    <div className="mb-3 px-3 w-full">
                                        <textarea name="" id="" value={bookingDetails.address} onChange={(e) => setBookingDetails({ ...bookingDetails, address: e.target.value })} placeholder='address' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full'></textarea>
                                    </div>
                                    {/* <div className="mb-3 px-3 w-full">
                                    <p className='text-gray-400' >resume</p>
                                    <input type="file" id='fileInput' className='border border-gray-400 rounded placeholder-gray-500 w-full file:bg-gray-400 file:p-2 file:text-white' />
                                </div> */}
                                </div>

                                {/* footer of modal */}
                                <div class="bg-gray-200 px-6 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button" onClick={makePayment} class="inline-flex w-full justify-center rounded-md bg-green-900 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white sm:ml-3 sm:w-auto hover:text-black hover:border-gray-300">Proceed to Pay</button>
                                    <button type="button" onClick={handleReset} class="mt-3 inline-flex w-full justify-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto hover:text-black" >Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default CartPage;
