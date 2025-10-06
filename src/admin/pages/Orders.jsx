import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function Orders() {
  return (
    <>
    <AdminHeader/>
   <div className="flex min-h-screen bg-gray-100">
    <AdminSidebar/>
   </div>
   </>
  )
}

export default Orders
