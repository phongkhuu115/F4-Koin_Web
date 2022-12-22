import React, { useState, useEffect } from 'react';
import { BaseURL, GetAPIToken } from './helpers/GlobalFunction';
import userImg from '../assets/userimg.jpg'

function UserInfo(props) {
  const [state, setState] = useState('');
  const [profile, setProfile] = useState({})

  useEffect(() => {
    let url = BaseURL() + "getMyProfile"
    GetAPIToken(url).then(res => {
      if (res.data.message === 'success') {
        setProfile(res.data.profile)
      }
    })
  }, []);

  return (
    <>
      <div className='d-flex flex-column h-100 p-5 m-5'>
        <p className='fw-semibold text-center'>Profile</p>
        <div className='text-center'>
          <img src={userImg} alt="" />
        </div>
        <div>
          <div className=''>
            <p className='mb-0 fs-3'>Tên: </p>
            <input type="text" className='form-control fs-3 my-3' readOnly name="name" id="name" value={profile.userFullName}/>
          </div>
          <div className=''>
            <p className='mb-0 fs-3'>Email: </p>
            <input type="text" className='form-control fs-3 my-3' readOnly name="email" id="email" value={profile.userEmail}/>
          </div>
          <div className=''>
            <p className='mb-0 fs-3'>Số Điện Thoại:</p>
            <input type="text" className='form-control fs-3 my-3' readOnly name="phone" id="phone" value={ profile.userTelephone}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfo;