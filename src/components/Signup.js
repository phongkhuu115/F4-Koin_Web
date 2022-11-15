import '../styles/Signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainPic from '../assets/koi.png';
import React, { useState, useEffect } from 'react';


function RenderSignup() {
  const [username, setUsername] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userFullName, setUserFullName] = useState();
  const [userTelephone, setUserTelePhone] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();

  async function loginUser(sendData) {
    return fetch('https://backend.f4koin.cyou/api/register', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sendData)
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  var handleSubmit = async e => {
    e.preventDefault();
    const sendBody = await {
      username,
      userEmail,
      userFullName,
      userTelephone,
      password,
      confirm
    }
    console.log(sendBody);
    var result = loginUser(sendBody);

    result = await result.json;
  }
  return (
    <div className="Main container-fluid h-100 position-relative">
      <form action="" className='position-absolute'>
        <h1 className='fw-bold mb-5'>Create Account</h1>
        <div className="input-container d-flex justify-content-between">
          <div className="half">
            <label htmlFor="username" className='fs-3 mb-2'>Username: </label>
            <input type="text" name="username" id="username" className="form-control fs-4 p-4 mb-3" placeholder='erik115' onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="email" className='fs-3 mb-2'>Email: </label>
            <input type="email" name="email" id="email" className="form-control fs-4 p-4 mb-3" placeholder='eric115@gmail.com' onChange={(e) => setUserEmail(e.target.value)} />
            <label htmlFor="password" className='fs-3 mb-2'>Password: </label>
            <input type="password" name="password" id="password" className="form-control fs-4 p-4 mb-3" placeholder='•••••••••••••••••' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="half">
            <label htmlFor="fullName" className='fs-3 mb-2'>Full Name: </label>
            <input type="text" name="fullName" id="fullName" className="form-control fs-4 p-4 mb-3" placeholder='Eric Sanders' onChange={(e) => setUserFullName(e.target.value)} />
            <label htmlFor="phoneNumber" className='fs-3 mb-2'>Phone Number: </label>
            <input type="text" name="phoneNumber" id="phoneNumber" className="form-control fs-4 p-4 mb-3" placeholder='0123456789' onChange={(e) => setUserTelePhone(e.target.value)} />
            <label htmlFor="confirm-pass" className='fs-3 mb-2'>Confirm Password: </label>
            <input type="text" name="confirm-pass" id="confirm-pass" className="form-control fs-4 p-4 mb-3" placeholder='•••••••••••••••••' onChange={(e) => setConfirm(e.target.value)} />
          </div>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button type="submit" className='btn btn-outline-dark text-uppercase fw-bold fs-3 border border-2 border-dark signup-button'>Create Account</button>
          <button type="submit" className='btn btn-outline-dark text-uppercase fw-bold fs-3 border border-2 border-dark signup-button'><i class="fa-brands fa-google"></i> Sign in with Google</button>
        </div>
      </form>
      <img src={mainPic} className="main-pic h-75 position-absolute top-50 translate-middle" alt="" />
    </div>
  );
}

export default RenderSignup;