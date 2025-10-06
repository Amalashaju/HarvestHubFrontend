import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { homeProductApi } from '../../services/allApi';
import { Link } from 'react-router-dom';

const faqs = [
    {
        question: "Where do you source your products?",
        answer: "All products are sourced directly from certified local farmers.",
    },
    {
        question: "Is delivery available in my area?",
        answer: "We currently deliver across major towns and cities. Check your address during checkout.",
    },
    {
        question: "Can I return a product?",
        answer: "Yes, we have a return policy for damaged or incorrect items.",
    },
    {
        question: "Are all products organic?",
        answer: "Most of our products are organically grown. Each product listing includes details about its farming methods.",
    },
    {
        question: "How can I become a seller on HarvestHub?",
        answer: "You can sign up as a seller through our 'Become a Seller' page. Our team will contact you for verification.",
    },
];



function Home() {

    const [homeProduct, sethomeProduct] = useState([])
    const [openIndex, setOpenIndex] = useState(null);
    const [token, setToken] = useState("")



    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    const getAllHomebook = async () => {
        const result = await homeProductApi()
        // console.log(result);
        if (result.status == 200) {
            sethomeProduct(result.data)
        }
    }
    // console.log(homeProduct);
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const tok = sessionStorage.getItem("token")
            setToken(tok)
        }
    }, [])

    useEffect(() => {
        getAllHomebook()
    }, [])

    return (
        <>
            <Header />

            <div className='flex justify-center items-center pt-10 bg-white'>
                <div className='flex justify-center items-center px-50 mt-20'>
                    <div className='mb-25'>
                        <h1 className='text-6xl text-green-950 font-bold pt-5 pb-8'>Fresh Produce from Farm to Fork...</h1>
                        <h1 className='text-3xl text-green-950 font-bold pt-5'>Experience the Taste of Nature with Every Bite</h1>
                        <p className='text-xl pt-5 pb-8'>Connect directly with farmers and get fresh organic products delivered to your door Skip the middlemen and support local farmers. HarvestHub connects you directly to the hands that grow your food — ensuring freshness, purity, and sustainability in every product.</p>

                       {token && <Link to={'/products'}><button className='border rounded bg-green-800 px-8 py-3  text-white font-bold'>Shop Now</button></Link>}
                       {!token && <Link to={'/login'}><button className='border rounded bg-green-800 px-8 py-3  text-white font-bold'>Shop Now</button></Link>}
                    </div>
                    {/* <div>
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/young-farmer-pushing-a-wheelbarrow-of-vegetables-and-fruit-illustration-download-in-svg-png-gif-file-formats--push-pack-agriculture-illustrations-2612454.png" alt="" style={{ width: '600px', height: '300px' }} />
                    </div> */}
                </div>

            </div>

            <section className='flex justify-center items-center flex-col pt-15 bg-amber-100 pb-4 '>
                <h1 className='text-4xl text-green-800 font-bold pt-10 pb-5'>Explore Latest items</h1>
                <div className='md:grid grid-cols-4 justify-center items-center py-5'>
                    {
                        homeProduct?.length > 0 ?
                            homeProduct?.map((item) => (
                                <div className='rounded bg-white m-4 shadow-md'>
                                    <img src={item.imageurl} alt="" style={{ width: '300px', height: '200px' }} />
                                    <p className='text-center px-2 py-2'>{item.productName}</p>
                                    <p className='text-center text-blue-500 px-2 py-2'>Rs. {item.description.slice(0, 21)}...</p>
                                    <p className='text-center text-green-700 px-2 py-2'>Rs. {item.dprice}</p>
                                </div>
                            )) :
                            <p>Loading</p>
                    }

                </div>


                <Link to={'/products'}><button className='border mb-20 rounded border-green-800 px-8 py-3  text-green-950 text-lg font-bold '>Explore More</button></Link>
            </section>

            <section className="py-16 px-6 bg-amber-50">
                <h3 className="text-3xl font-semibold text-center text-green-800 mb-10">How It Works</h3>
                <div className="grid md:grid-cols-3 gap-8 container mx-auto text-center">
                    <div>
                        <div className="text-4xl mb-4">👨‍🌾</div>
                        <h4 className="font-bold text-xl">1. Choose a Farmer</h4>
                        <p className="text-sm mt-2">Browse local farms and select the products you love.</p>
                    </div>
                    <div>
                        <div className="text-4xl mb-4">🛒</div>
                        <h4 className="font-bold text-xl">2. Place Your Order</h4>
                        <p className="text-sm mt-2">Add items to your cart and check out securely.</p>
                    </div>
                    <div>
                        <div className="text-4xl mb-4">📦</div>
                        <h4 className="font-bold text-xl">3. Get It Delivered</h4>
                        <p className="text-sm mt-2">Enjoy fast, fresh delivery to your doorstep.</p>
                    </div>
                </div>
            </section>



            <section className='bg-white py-5'>
                <div className="max-w-2xl mx-auto pt-10   ">
                    <h2 className="text-2xl font-bold mb-6 text-center">❓ Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-300 bg-amber-50 rounded-xl p-4 shadow-sm">
                                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(index)}>
                                    <h3 className="font-semibold text-lg">{faq.question}</h3>
                                    <span className="text-xl font-bold">
                                        {openIndex === index ? "×" : "+"}
                                    </span>
                                </div>
                                {openIndex === index && (
                                    <p className="mt-3 text-gray-600 transition duration-300">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <Footer />
        </>
    )
}

export default Home
