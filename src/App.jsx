import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './users/pages/Home'
import PagenotFound from './pages/PagenotFound'
import { useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './users/pages/Products'
import SellerHome from './seller/pages/SellerHome'
import ProductAdd from './seller/pages/ProductAdd'
import AdminHome from './admin/pages/AdminHome'
import ViewProduct from './users/pages/ViewProduct'
import CartPage from './users/components/CartPage'
import Paymentsuccess from './users/pages/Paymentsuccess'
import Paymenterror from './users/pages/Paymenterror'
import Profile from './users/pages/Profile'
import SellerProfile from './seller/pages/SellerProfile'
import AdminProfile from './admin/pages/AdminProfile'
import AdminViewProducts from './admin/pages/AdminViewProducts'
function App() {

  const [isloading , setIsloading] = useState(false)
  
  useEffect(()=>{
    setTimeout(()=>{
      setIsloading(true)
    },1000)
  },[])
 
  return (
    <>
    

     <Routes>
      <Route path='/' element={isloading?<Home/>:<Preloader/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/products' element={<Products/>} />
      <Route path='/seller-home' element={<SellerHome/>} />
      <Route path='/add-product' element={<ProductAdd/>}/>
      <Route path='/seller-profile' element={<SellerProfile/>}/>

      <Route path='/admin-home' element={<AdminHome/>}/>
      <Route path='/admin-profile' element={<AdminProfile/>}/>
       <Route path='/admin-view-products' element={<AdminViewProducts/>}/>

      <Route path='/view-product/:id' element={<ViewProduct/>}/>
      <Route path='/cart-page' element={<CartPage/>}/>
      <Route path='/payment-success' element={<Paymentsuccess/>}/>
      <Route path='/payment-error' element={<Paymenterror/>}/>
      <Route path='/user-profile' element={<Profile/>}/>
      

      <Route path='*' element={<PagenotFound/>} />
     </Routes>

    
    </>
  )
}

export default App
