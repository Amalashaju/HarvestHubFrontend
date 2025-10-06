import React from 'react'

function Preloader() {
    return (
        <>
            <div className='w-full min-h-screen flex justify-center items-center bg-amber-50'>
                <div className='md:grid grid-cols-3'>
                    <div></div>
                    <div className='flex justify-center items-center  p-5 md:p-0'>
                        <img src='https://cdn-icons-gif.flaticon.com/11188/11188750.gif' alt="" />
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default Preloader
