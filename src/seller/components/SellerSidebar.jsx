
import { faBagShopping } from '@fortawesome/free-solid-svg-icons/faBagShopping'
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook'
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {  useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../../services/serverUrl'
import { sellerProfileUpdateStatusContext } from '../../../context/Contextshare'




function SellerSidebar() {
  const [HomeStatus, setHomeStatus] = useState(false)
  const [BookStatus, setBookStatus] = useState(false)
  const [CareerStatus, setCareerStatus] = useState(false)
  const [SettingStatus, setSettingStatus] = useState(false)
  
  const [sellerD, setsellerD] = useState({
    username: "",
    profile: ""
  })
  const navigate = useNavigate()
  const {sellerProfileUpdateStatus} =useContext(sellerProfileUpdateStatusContext)
  const filter = (data) => {
    if (data == 'home') {
      navigate('/seller-home')
    }
    else if (data == 'add-product') {
      navigate('/add-product')
    }
    else if (data == 'view-users') {
      navigate('/seller-home');
    } else if (data == 'settings') {
      navigate('/seller-profile');
    } else {
      navigate('*');
    }


  }
  useEffect(() => {
    if (location.pathname == '/admin-home') {
      setHomeStatus(true)
    }
    else if (location.pathname == '/admin-books') {
      setBookStatus(true)
    }
    else if (location.pathname == '/admin-careers') {
      setCareerStatus(true)
    }
    else if (location.pathname == '/admin-settings') {
      setSettingStatus(true)
    }
    else {
      console.log('no such page');

    }
    const user = JSON.parse(sessionStorage.getItem("existingUser"))
    setsellerD({ username: user.username, profile: user.profile })

   

  }, [sellerProfileUpdateStatus])
  return (
    <>
      <div className='flex justify-center items-center flex-col'>
        <img src={sellerD.profile==""? "https://cdn-icons-png.freepik.com/512/8742/8742495.png" : `${serverUrl}/upload/${sellerD.profile}`} alt="" style={{ width: "150px", height: "150px",borderRadius:'50%' }} />
        <h3 className='mt-5'>{sellerD.username}</h3>
      </div>
      <div className='my-5'>
        <div className='mb-3'>
          <input type="radio" id='home' name='filter' readOnly checked={HomeStatus} />
          <label htmlFor="home" onClick={() => filter('home')} className='ms-3' >         <FontAwesomeIcon icon={faHome} className="me-3" />
            Home</label>
        </div>

        <div className='mb-3'>
          <input type="radio" id='add-product' name='filter' readOnly checked={BookStatus} />
          <label htmlFor="allbooks" onClick={() => filter('add-product')} className='ms-3' >         <FontAwesomeIcon icon={faBook} className="me-3" />
            Add Product</label>
        </div>

        <div className='mb-3'>
          <input type="radio" id='view-users' name='filter' readOnly checked={CareerStatus} />
          <label htmlFor="careers" onClick={() => filter('view-users')} className='ms-3' >         <FontAwesomeIcon icon={faBagShopping} className="me-3" />
            Users</label>
        </div>

        <div className='mb-3'>
          <input type="radio" id='settings' name='filter' readOnly checked={SettingStatus} />
          <label htmlFor="settings" onClick={() => filter('settings')} className='ms-3' >         <FontAwesomeIcon icon={faGear} className="me-3" />
            Settings</label>
        </div>
      </div>
    </>
  )
}

export default SellerSidebar
