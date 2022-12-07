import '../styles/Signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainPic from '../assets/weblogo.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PostAPINoToken, BaseURL } from './helpers/GlobalFunction'

function RenderSignup() {
  const [username, setUsername] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userFullName, setUserFullName] = useState();
  const [userTelephone, setUserTelePhone] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const navigate = useNavigate();

  let handleSignup = async (e) => {
    e.preventDefault();
    let passwordInput = document.getElementById('password').value;
    let confirmPassInput = document.getElementById('confirm-pass').value;
    if (passwordInput !== confirmPassInput) {
      alert('Mật khẩu không trùng khớp')
      return;
    }

    let url = BaseURL() + "register"
    let body = {
      username: username,
      userEmail: userEmail,
      userFullName: userFullName,
      userTelephone: userTelephone,
      password: password,
      password_confirmation: confirm
    }
    PostAPINoToken(url,body).then(res => {
      console.log(res)
      if (res.status === 201) {
        alert('Đăng ký thành công')
        navigate('/login', {

        });
      }
    })
  }

  let acceptInput = (id, value) => {
    const validateMessage = document.querySelectorAll('.validateMsg');
    switch (id) {
      case 'username': {
        validateMessage[0].innerHTML = '&ensp;';
        setUsername(value)
        break;
      }
      case 'fullName': {
        validateMessage[1].innerHTML = '&ensp;';
        setUserFullName(value);
        break;
      }
      case 'phoneNumber': {
        validateMessage[2].innerHTML = '&ensp;';
        setUserTelePhone(value);
        break;
      }
    }
  }

  let rejectInput = (id, value) => {
    const validateMessage = document.querySelectorAll('.validateMsg');
    let rejectString = 'Thông tin không chứa kí tự đặc biệt';
    if (!value) {
      rejectString = 'Thông tin không được để trống';
    }
    switch (id) {
      case 'username': {
        validateMessage[0].innerHTML = rejectString;
        setUsername('')
        break;
      }
      case 'fullName': {
        validateMessage[1].innerHTML = rejectString;
        setUserFullName('');
        break;
      }
      case 'phoneNumber': {
        validateMessage[2].innerHTML = rejectString;
        setUserTelePhone('');
        break;
      }
    }
  }

  let validateString = (e) => {
    const pattern = /^[a-zA-Z0-9]+$/;
    if (e.target.value.match(pattern)) {
      e.target.classList.remove('is-invalid');
      e.target.classList.add('is-valid');
      acceptInput(e.target.id, e.target.value)
    }
    else {
      e.target.classList.remove('is-valid');
      e.target.classList.add('is-invalid');
      rejectInput(e.target.id, e.target.value)
    }
  }
  let validateEmail = (e) => {
    const pattern = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
    const validateEmail = document.querySelector('.validateEmail');
    if (e.target.value.match(pattern)) {
      validateEmail.innerHTML = '&ensp;';
      e.target.classList.remove('is-invalid');
      e.target.classList.add('is-valid');
      setUserEmail(e.target.value)
    }
    else {
      validateEmail.innerHTML = 'Vui lòng nhập đúng định dạng Email';
      e.target.classList.remove('is-valid');
      e.target.classList.add('is-invalid');
      setUserEmail('');
    }
  }

  let rejectPassword = (id, value) => {
    const validateMessage = document.querySelectorAll('.validatePass');
    let rejectString = 'Thông tin không chứa kí tự đặc biệt';
    if (value.length < 8) {
      rejectString = 'Mật khẩu tối thiểu 8 kí tự';
    }
    switch (id) {
      case 'confirm-pass': {
        validateMessage[1].innerHTML = rejectString;
        setConfirm('')
        break;
      }
      case 'password': {
        validateMessage[0].innerHTML = rejectString;
        setPassword('')
        break;
      }
    }
  }

  let acceptPassword = (id, value) => {
    const validateMessage = document.querySelectorAll('.validatePass');
    switch (id) {
      case 'confirm-pass': {
        validateMessage[1].innerHTML = '&ensp;';
        setConfirm(value)
        break;
      }
      case 'password': {
        validateMessage[0].innerHTML = '&ensp;';
        setPassword(value)
        break;
      }
    }
  }

  let validatePassword = (e) => {
    const pattern = /^[a-zA-Z0-9]+$/;
    if (e.target.value.match(pattern) && e.target.value.length >= 8) {
      e.target.classList.remove('is-invalid');
      e.target.classList.add('is-valid');
      acceptPassword(e.target.id, e.target.value)
    }
    else {
      e.target.classList.remove('is-valid');
      e.target.classList.add('is-invalid');
      rejectPassword(e.target.id, e.target.value)
    }
  }

  return (
    <div className="Main container-fluid h-100 position-relative">
      <form action="" className='position-absolute'>
        <h1 className='fw-bold mb-5'>Create Account</h1>
        <div className="input-container d-flex justify-content-between">
          <div className="half">
            <label htmlFor="username" className='fs-3 mb-2'>Username: </label>
            <input type="text" name="username" id="username" className="form-control fs-4 p-4 mb-3" placeholder='erik115' onBlur={validateString} onChange={validateString} required />
            <p className='validateMsg fs-4 text-danger'>&ensp;</p>
            <label htmlFor="email" className='fs-3 mb-2'>Email: </label>
            <input type="email" name="email" id="email" className="form-control fs-4 p-4 mb-3" placeholder='eric115@gmail.com' onChange={validateEmail} />
            <p className='validateEmail fs-4 text-danger'>&ensp;</p>
            <label htmlFor="password" className='fs-3 mb-2'>Password: </label>
            <input type="password" name="password" id="password" className="form-control fs-4 p-4 mb-3" placeholder='•••••••••••••••••' onBlur={validatePassword} onChange={validatePassword} required />
            <p className='validatePass fs-4 text-danger'>&ensp;</p>
          </div>
          <div className="half">
            <label htmlFor="fullName" className='fs-3 mb-2'>Full Name: </label>
            <input type="text" name="fullName" id="fullName" className="form-control fs-4 p-4 mb-3" placeholder='Eric Sanders' onBlur={validateString} onChange={validateString} required />
            <p className='validateMsg fs-4 text-danger'>&ensp;</p>
            <label htmlFor="phoneNumber" className='fs-3 mb-2'>Phone Number: </label>
            <input type="text" name="phoneNumber" id="phoneNumber" className="form-control fs-4 p-4 mb-3" placeholder='0123456789' onBlur={validateString} onChange={validateString} required />
            <p className='validateMsg fs-4 text-danger'>&ensp;</p>
            <label htmlFor="confirm-pass" className='fs-3 mb-2'>Confirm Password: </label>
            <input type="password" name="confirm-pass" id="confirm-pass" className="form-control fs-4 p-4 mb-3" placeholder='•••••••••••••••••' onBlur={validatePassword} onChange={validatePassword} required />
            <p className='validatePass fs-4 text-danger'>&ensp;</p>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button type="submit" className='btn btn-outline-dark text-uppercase fw-bold fs-3 border border-2 border-dark signup-button' onClick={handleSignup}>Create Account</button>
          {/* <button type="submit" className='btn btn-outline-dark text-uppercase fw-bold fs-3 border border-2 border-dark signup-button'><i class="fa-brands fa-google"></i> Sign in with Google</button> */}
        </div>
      </form>
      <img src={mainPic} className="main-pic h-75 position-absolute top-50 translate-middle" alt="" />
    </div>
  );
}

export default RenderSignup;