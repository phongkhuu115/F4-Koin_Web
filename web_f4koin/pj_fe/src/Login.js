import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainPic from './koi.png';
import React, { useState, useEffect } from 'react';

async function loginUser(sendData) { 
  return fetch('http://be.f4koin.cyou/api/login', {
    method: 'POST',
   headers: {
     'Content-Type': 'x-www-form-urlencoded'
   },
   body: JSON.stringify(sendData)
  }).then((response) => response.json()).then((data) => console.log(data));
}

function RenderLogin() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  var handleSubmit = async e => { 
    e.preventDefault();
    const sendBody = await {
      username,
      password
    }

    var result = loginUser(sendBody);

    result = await result.json;

    console.log(result);
  }
  return (
    <div className="Main container-fluid d-flex justify-content-center align-items-center h-100 position-relative">
      <form action="" className='login-form position-absolute'>
        <label htmlFor="" className='fs-3 mb-2'>Username:</label>
        <input type="text" name="" id="" placeholder='example123' className='form-control fs-4 p-4' onChange={(e) => setUsername(e.target.value)}/>
        <div id="emailHelp" class="form-text my-3 fs-5">We'll never share your email with anyone else.</div>
        <label htmlFor="" className='fs-3 mb-2'>Password:</label>
        <input type="password" name="" id="" className='form-control fs-4 p-4' placeholder='•••••••••••••••••' onChange={(e) => setPassword(e.target.value)}/>
        <div className="d-flex align-items-center justify-content-between">
          <div className='d-flex align-items-center'>
            <input type="checkbox" name="" id="" className='d-inline-block' />
            <label htmlFor="" className='d-inline-block fs-4 ms-3'>Remember me?</label>
          </div>
          <a href="" className='fs-4'>Forgot Password ?</a>
        </div>
        <div className="d-flex justify-content-evenly mt-4">
          <button type="submit" className='form-button text-uppercase fw-bold fs-3' onClick={handleSubmit}>Log In</button>
          <button type="submit" className='form-button text-uppercase fw-bold fs-3'>Sign UP</button>
        </div>
      </form>
      <img src={mainPic} className="main-pic h-75 position-absolute top-50 translate-middle" alt="" />
    </div>
  );
}

export default RenderLogin;