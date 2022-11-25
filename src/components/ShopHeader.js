import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ShopHeader.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { GetToken } from '../components/helper/GlobalFunction'
import axios from 'axios';

var getCategory = async () => {
  let data = await axios('https://backend.f4koin.cyou/api/getAllCategory', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data;
}
var getUserData = async () => {
  let data = await axios('https://backend.f4koin.cyou/api/getMyProfile', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GetToken(),
    },
  })
  return data;
}
function RenderCategory() {
  let [category, setCategory] = useState([]);
  useEffect(() => {
    getCategory().then(res => {
      setCategory(res.data.category.slice());
    })
  }, [])
  return category.map(item => {
    return (
      <option value={item.categoryID}>{item.categoryName}</option>
    )
  })
}
function RenderUser() {
  const [userFullName, setFullName] = useState();
  let [message, setMessage] = useState();
  useEffect(() => {
    getUserData().then(res => {
      setFullName(res.data.profile.userFullName)
      setMessage(res.data.message);
    })
  }, [])
  if (message === 'success') {
    return (
      <div className="avatar d-flex align-items-center">
        <p className='mb-0 fs-3'>Xin chào, {userFullName}</p>
      </div>
    )
  }
  else {
    return (
      <div className="avatar d-flex align-items-center">
        <p className='mb-0 fs-3 d-flex align-items-center'>
          <Link to='/login' className='text-decoration-none text-dark border-end border-dark pe-3'>Đăng nhập </Link>
          <Link to='/signup' className='text-decoration-none text-dark ps-3'>Đăng ký</Link>
        </p>
      </div>
    )
  }
}

function ShopHeader() {
  return (
    <>
      <header className='navbar navbar-expand-lg bg-light justify-content-evenly shadow'>
        <Link class="navbar-brand fw-bold fs-3 text-uppercase" to='/home'>Koi Store</Link>
        <form action="" className='search-group d-flex'>
          <select id="catergory" name="catergory" className='p-3 bg-transparent fs-4 fw-bold border-0'>
            <option value="1">All Categories</option>
            <RenderCategory></RenderCategory>
          </select>
          <hr className='border border-dark ms-3' />
          <input type="text" className='search-input form-control fs-4 p-4 bg-transparent' placeholder='Search for items...' />
          <button type="submit" className='search-btn btn btn-dark fs-4'>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <Link to='/home/cart'>
          <button type="button" class="btn-cart btn btn-primary position-relative fs-4">
            <i class="fa-solid fa-cart-shopping"></i> <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2"><span class="visually-hidden">unread messages</span></span>
          </button>
        </Link>
        <RenderUser></RenderUser>
      </header>
      <Outlet></Outlet>
    </>
  );
}

export default ShopHeader;