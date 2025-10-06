import React from 'react'
import leaf2 from '../assets/images/leaf2.jpeg'
import leaf1 from '../assets/images/leaf1.jpeg'
import notfound from '../assets/images/notfound.jpeg'
import { Link } from 'react-router-dom'

function PagenotFound() {
    return (
        <>
            <div className='w-full min-h-screen flex justify-center items-center bg-amber-50'>
                <div className='md:grid grid-cols-3'>
                    <div></div>
                    <div className='flex justify-center items-center flex-col p-5 md:p-0'>
                        {/* <div className='flex justify-center items-center'>
                            <img src={leaf2} alt="" style={{ width: '70px' }} />
                            <h1 className='text-green-900 text-3xl font-bold '>HarvestHub</h1>
                        </div> */}

                        {/* <img src={leaf1} alt=""  style={{ width: '200px' }} /> */}
                        <p className='text-green-900 text-4xl font-bold'>Oops!</p>
                        <p className='text-green-900 text-4xl font-bold pb-2'>Page Not Found</p>
                        <p className="text-green-900 text-xl mb-6  md:max-w-3xl max-w-xl text-justify pt-3 ">Looks like the page you're looking for got lost in the fields.Let's bring you back to the farm</p>
                        <div className='flex justify-center items-center pb-10'>
                            <Link to='/'><button className='bg-green-950 border rounded text-white px-4 py-3 text-xl   hover:border hover:border-green-950 hover:bg-white hover:text-green-950 hover:text-xl'>Back to Home</button></Link>
                            <img src={notfound} alt="" style={{ width: '300px' }} />
                        </div>


                    </div>
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default PagenotFound
