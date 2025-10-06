import React, { useState } from 'react'
import { createContext } from 'react'

export const searchKeyContext = createContext("")
export const sellerProfileUpdateStatusContext = createContext("")
export const userProfileUpdateStatusContext = createContext("")
export const adminProfileUpdateStatusContext = createContext("")

function Contextshare({ children }) {
    const [searchKey, setSearchKey] = useState("")
    const [sellerProfileUpdateStatus, setsellerProfileUpdateStatus] = useState({})
    const [userProfileUpdateStatus, setuserProfileUpdateStatus] = useState({})
    const [adminProfileUpdateStatus, setadminProfileUpdateStatus] = useState({})


    return (

        <adminProfileUpdateStatusContext.Provider value={{adminProfileUpdateStatus, setadminProfileUpdateStatus}}>
            <userProfileUpdateStatusContext.Provider value={{ userProfileUpdateStatus, setuserProfileUpdateStatus }}>
                <sellerProfileUpdateStatusContext.Provider value={{ sellerProfileUpdateStatus, setsellerProfileUpdateStatus }}>
                    <searchKeyContext.Provider value={{ searchKey, setSearchKey }}>
                        {
                            children
                        }
    
                    </searchKeyContext.Provider>
                </sellerProfileUpdateStatusContext.Provider>
            </userProfileUpdateStatusContext.Provider>
        </adminProfileUpdateStatusContext.Provider>

    )
}

export default Contextshare
