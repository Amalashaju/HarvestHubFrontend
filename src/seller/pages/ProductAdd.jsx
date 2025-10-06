import React, { useEffect, useState } from 'react';
import SellerHeader from '../components/SellerHeader';
import SellerSidebar from '../components/SellerSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { addProductApi } from '../../services/allApi';
import Footer from '../../components/Footer';


function ProductAdd() {
    const [productDetails, setproductDetails] = useState({
        productName: "", category: "", imageurl: "", price: "", dprice: "", netQuantity: "", quantity: "", harvestDate: "", description: "",
        uploadedImage: []
    })
    const [preview, setpreview] = useState("")
    const [previewList, setpreviewList] = useState([])
    const [token, setToken] = useState("")

    console.log(productDetails);

    const handleUpload = (e) => {
        console.log(e.target.files[0]);
        const fileArray = productDetails.uploadedImage
        fileArray.push(e.target.files[0])
        setproductDetails({ ...productDetails, uploadedImage: fileArray })

        const url = URL.createObjectURL(e.target.files[0])
        console.log(url);

        setpreview(url)
        const newArray = previewList
        newArray.push(url)
        setpreviewList(newArray)


    }

    const handleReset = () => {
        setproductDetails({
            productName: "", category: "", imageurl: "", price: "", dprice: "", netQuantity: "", quantity: "", harvestDate: "", description: "",
            uploadedImage: []
        })
        setpreview("")
        setpreviewList([])
    }

    const handleSubmit = async () => {
        const { productName, category, imageurl, price, dprice, netQuantity, quantity, harvestDate, description, uploadedImage } = productDetails

        if (!productName || !category || !imageurl || !price || !dprice || !netQuantity || !quantity || !harvestDate || !description || !uploadedImage) {
            toast.info('Please will the fields completely')
        }
        else {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }

            const reqBody = new FormData()

            for (let key in productDetails) {
                if (key != 'uploadedImage') {
                    reqBody.append(key, productDetails[key])
                }
                else {
                    productDetails.uploadedImage.forEach((item) => {
                        reqBody.append("uploadedImage", item)
                    })
                }
            }

            const result = await addProductApi(reqBody, reqHeader)
            console.log(result);

            if (result.status == 401) {
                toast.warning(result.response.data)
                handleReset()
            }
            else if (result.status == 200) {
                toast.success('product added successfully')
                handleReset()
            }
            else {
                toast.error('something went wrong')
                handleReset()
            }



        }

    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    }, [])

    return (
        <>

            <SellerHeader />
            <div className='min-h-screen md:grid grid-cols-[1fr_4fr]'>
                <div className='bg-blue-200 flex flex-col items-center p-5'>
                    <SellerSidebar />
                </div>
                <div className="w-full max-w-6xl mx-auto p-4 md:p-10">
                    <div className="bg-white p-8 rounded-xl shadow-md border border-green-100 space-y-8">
                        <h2 className="text-4xl font-extrabold text-green-700">Add New Product</h2>
                        {/* General Info */}
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Product Name</label>
                                    <input value={productDetails.productName} onChange={(e) => setproductDetails({ ...productDetails, productName: e.target.value })} type="text" placeholder="e.g. Organic Carrot" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" />
                                </div>
                                {/* Category & Tags */}
                                <div className="grid md:grid-cols-1 gap-6">
                                    <div className="space-y-4">
                                        <label className="block mb-1 text-sm font-medium">Category</label>
                                        <select
                                            value={productDetails.category}
                                            onChange={(e) => setproductDetails({ ...productDetails, category: e.target.value })}
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600">
                                            <option value="" disabled>Select Category</option>
                                            <option value="Mashroom">Mashrooms</option>
                                            <option value="Leafy-greens">Leafy Greens</option>
                                            <option value="Fruiting-vegetables">Fruiting Vegetables</option>
                                            <option value="Bulb-vegetables">Bulb Vegetables</option>
                                            <option value="Root-vegetables">Root Vegetables</option>
                                        </select>

                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block mb-1 text-sm font-medium">Image URL</label>
                                        <input value={productDetails.imageurl} onChange={(e) => setproductDetails({ ...productDetails, imageurl: e.target.value })} type="text" placeholder="URL" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" />
                                    </div>
                                    <label className="block mb-1 text-sm font-medium">Price</label>
                                    <input value={productDetails.price} onChange={(e) => setproductDetails({ ...productDetails, price: e.target.value })} type="text" placeholder="Price " className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" />
                                    <label className="block mb-1 text-sm font-medium">Discount Price</label>
                                    <input value={productDetails.dprice} onChange={(e) => setproductDetails({ ...productDetails, dprice: e.target.value })} type="text" placeholder="Discount" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" />
                                </div>
                                <div className="space-y-4">
                                    <label className="block mb-1 text-sm font-medium">Quantity</label>
                                    <input value={productDetails.netQuantity} onChange={(e) => setproductDetails({ ...productDetails, netQuantity: e.target.value })} type="text" placeholder="Enter quantity in Kg" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" />
                                </div>
                                <div className="space-y-4">
                                    <label className="block mb-1 text-sm font-medium">Stock</label>
                                    <input value={productDetails.quantity} onChange={(e) => setproductDetails({ ...productDetails, quantity: e.target.value })} type="text" placeholder="Enter quantity in Kg" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" />
                                </div>
                            </div>
                            {/* Product Media */}



                            <div className="space-y-4">
                                <label className="block mb-1 text-sm font-medium">Harvest Date</label>
                                <input value={productDetails.harvestDate} onChange={(e) => setproductDetails({ ...productDetails, harvestDate: e.target.value })} type="date" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" />
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Description</label>
                                    <textarea value={productDetails.description} onChange={(e) => setproductDetails({ ...productDetails, description: e.target.value })} rows="4" placeholder="Short description..." className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" />
                                </div>


                                <div className="mb-3 flex justify-center items-center w-full mt-10">
                                    {!preview ? <label htmlFor='imagefile'>
                                        <input id='imagefile' type="file" style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
                                        <img src="https://toppng.com/uploads/thumbnail/scan-to-cloud-icon-upload-image-icon-11553431815jqihyhzexo.png" alt="" style={{ width: '250px', height: '200px' }} />
                                    </label> :
                                        <img src={preview} alt="" style={{ width: '250px', height: '200px' }} />}
                                </div>

                                {preview && <div className="mb-3 flex justify-center items-center w-full mt-10">
                                    {previewList?.map((item) => (
                                        <img src={item} alt="no image" style={{ width: '70px', height: '70px' }} className="mx-3" />
                                    ))}
                                    {previewList.length < 3 && <label htmlFor='imagefile'>
                                        <input id='imagefile' type="file" style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
                                        <FontAwesomeIcon icon={faSquarePlus} className='fa-2x shadow ms-3 text-gray-500' />
                                    </label>}

                                </div>}
                            </div>
                        </div>

                        <div className='flex justify-end mt-6 gap-4'>
                            <button onClick={handleReset} className='bg-amber-600 px-5 py-2 rounded text-black hover:bg-white border border-transparent hover:border-amber-600 hover:text-amber-600'>Reset</button>
                            <button onClick={handleSubmit} className='bg-green-600 px-5 py-2 rounded text-black hover:bg-white border border-transparent hover:border-green-600 hover:text-green-600'>Submit</button>
                        </div>
                    </div>
                </div>


            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
            <Footer />

        </>

    );
}

export default ProductAdd;
