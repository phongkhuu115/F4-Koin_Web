import '../styles/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainPic from '../assets/koi.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function RenderLogin() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const inputRegex = /^[a-zA-Z0-9]+$/;
  const navigate = useNavigate();
  var handleLogin = async e => {
    e.preventDefault();
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    let isValid = usernameInput.value.match(inputRegex) && passwordInput.value.match(inputRegex);
    const msg = document.querySelector('.allvalidate-msg')
    if (isValid) {
      msg.classList.add('d-none')
      try {
        let response = await axios('http://be.f4koin.cyou/api/login', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            username: username,
            password: password
          }
        }).then(res => {
          console.log(res);
          localStorage.setItem('auth', res.data.token);
          if (res.data.message === "Login success") {
            navigate('/home', {
              state: {
                fullname: res.data.user.userFullName,
              }
            });
          }
        })
      }
      catch (error) {
        console.log(error)
      }
    }
    else {
      msg.classList.remove('d-none')
    }
  }

  let validateInput = (e) => {
    const validateMessage = document.querySelectorAll('.invalid-feedback');
    if (e.target.value.match(inputRegex)) {
      e.target.classList.remove('is-invalid');
      e.target.classList.add('is-valid');
      switch (e.target.id) {
        case 'username': {
          validateMessage[0].innerHTML = '';
          setUsername(e.target.value)
          break;
        }
        case 'password': {
          validateMessage[1].innerHTML = '';
          setPassword(e.target.value)
          break;
        }
      }
    }
    else {
      if (!e.target.value) {
        switch (e.target.id) {
          case 'username': {
            validateMessage[0].innerHTML = 'Thông tin không được để trống';
            setUsername('')
            break;
          }
          case 'password': {
            validateMessage[1].innerHTML = 'Thông tin không được để trống';
            setPassword('')
            break;
          }
        }
      }
      else {
        switch (e.target.id) {
          case 'username':
            validateMessage[0].innerHTML = 'Thông tin không được chứa ký tự đặc biệt';
            setUsername('')

            break;
          case 'password':
            validateMessage[1].innerHTML = 'Thông tin không được chứa ký tự đặc biệt';
            setPassword('')
            break;
        }
      }
      e.target.classList.remove('is-valid');
      e.target.classList.add('is-invalid');
    }
  }
  return (
    <div className="Main container-fluid d-flex justify-content-center align-items-center h-100 position-relative">
      <form action="" className='login-form position-absolute'>
        <label htmlFor="username" className='fs-3 mb-3'>Tài Khoản :</label>
        <input type="text" name="username" id="username" placeholder='example123' className='form-control fs-4 p-4 mb-4' onChange={validateInput} onBlur={validateInput} required />
        <p className='invalid-feedback fs-4 mt-0'></p>
        <label htmlFor="password" className='fs-3 mb-3'>Mật Khẩu :</label>
        <input type="password" name="password" id="password" className='form-control fs-4 p-4 mb-4' placeholder='••••••••••••' onChange={validateInput} onBlur={validateInput} required />
        <p className='invalid-feedback fs-4 mt-0'></p>
        <div className="d-flex align-items-center justify-content-between">
          <div className='d-flex align-items-center'>
            <input type="checkbox" name="remember" id="remember" className='d-inline-block mb-1' />
            <label htmlFor="remember" className='d-inline-block fs-4 ms-3'>Remember me?</label>
          </div>
          <a href="" className='fs-4'>Forgot Password ?</a>
        </div>
        <p class="text-danger text-center fs-4 my-2 d-none allvalidate-msg">Thông tin đăng nhập không hợp lệ</p>
        <div className="d-flex justify-content-evenly mt-4">
          <button type="submit" className='form-button btn btn-outline-dark text-uppercase fw-bold fs-3 border border-2 border-dark' onClick={handleLogin}>Log In</button>
          <Link to='/signup'><button type="submit" className='form-button btn btn-outline-dark text-uppercase fw-bold fs-3 border border-2 border-dark'>Sign UP</button></Link>
        </div>
      </form>
      <img src={mainPic} className="main-pic h-75 position-absolute top-50 translate-middle" alt="" />
    </div>
  );
}

export default RenderLogin;