
//register - content-type = application/json

import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

export const registerApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/register`, reqBody)
}

export const loginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login`, reqBody)
}

export const homeProductApi = async () => {
    return await commonApi('GET', `${serverUrl}/all-home-product`)


}


//------------------------------------------------------------------------------------------
//                                              Admin

//api to update the user profile 
export const updateAdminProfileApi= async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/admin-profile-update`,reqBody,reqHeader)
} 
    

//------------------------------------------------------------------------------------------
//                                              seller
//add product

export const addProductApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/add-product`, reqBody, reqHeader)
}


//api to update the seller profile 
export const updatSellerProfileApi= async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/seller-profile-update`,reqBody,reqHeader)
} 


//-------------------------------------------------------------------------------------------
//                                                user
//get all products

export const getAllProductApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/all-products`, "", reqHeader)
}

//view a book
export const viewAProductApi = async (id) => {
    return await commonApi('GET', `${serverUrl}/view-product/${id}`)
}

//add to cart
export const addToCartApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/add-to-cart`, reqBody, reqHeader)
}

//get from cart
export const getCartApi = async (userId) => {
  return await commonApi("GET", `${serverUrl}/cart/${userId}`)
}


//api to make payment
export const makePaymentApi = async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/user-booking`,reqBody,reqHeader)
}

export const clearCartApi = async (userId, reqHeader) => {
  return await commonApi('PUT', `${serverUrl}/clear-cart/${userId}`,"", reqHeader);  // use {} not ""
};


//api to update the user profile 
export const updateUserProfileApi= async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/user-profile-update`,reqBody,reqHeader)
} 









