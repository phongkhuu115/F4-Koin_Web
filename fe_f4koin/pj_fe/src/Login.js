import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainPic from './koi.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom'

function RenderLogin() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  var handleLogin = async e => {
    e.preventDefault();
    try {
      let res = await axios('http://be.f4koin.cyou/api/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: username,
          password: password
        }
      })
      console.log(res)
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="Main container-fluid d-flex justify-content-center align-items-center h-100 position-relative">
      <form action="" className='login-form position-absolute'>
        <label htmlFor="username" className='fs-3 mb-2'>Username:</label>
        <input type="text" name="username" id="username" placeholder='example123' className='form-control fs-4 p-4' onChange={(e) => setUsername(e.target.value)} />
        <div id="emailHelp" class="form-text my-3 fs-5">We'll never share your email with anyone else.</div>
        <label htmlFor="password" className='fs-3 mb-2'>Password:</label>
        <input type="password" name="password" id="password" className='form-control fs-4 p-4' placeholder='••••••••••••' onChange={(e) => setPassword(e.target.value)} />
        <div className="d-flex align-items-center justify-content-between">
          <div className='d-flex align-items-center'>
            <input type="checkbox" name="remember" id="remember" className='d-inline-block mb-1' />
            <label htmlFor="remember" className='d-inline-block fs-4 ms-3'>Remember me?</label>
          </div>
          <a href="" className='fs-4'>Forgot Password ?</a>
        </div>
        <div className="d-flex justify-content-evenly mt-4">
          <button type="submit" className='form-button btn btn-outline-dark text-uppercase fw-bold fs-3' onClick={handleLogin}>Log In</button>
          <Link to = '/signup'><button type="submit" className='form-button btn text-uppercase fw-bold fs-3'>Sign UP</button></Link>
        </div>
      </form>
      <img src={mainPic} className="main-pic h-75 position-absolute top-50 translate-middle" alt="" />
    </div>
  );
}

export default RenderLogin;