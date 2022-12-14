import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ShopHeader.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { GetToken, PostAPINoBody } from '../components/helpers/GlobalFunction'
import { GetAPINoToken, GetAPIToken, BaseURL } from '../components/helpers/GlobalFunction';

function RenderCategory() {
  let categoryURL = BaseURL() + "getAllCategory"
  let [category, setCategory] = useState([]);
  useEffect(() => {
    GetAPINoToken(categoryURL).then(res => {
      setCategory(res.data.category.slice());
    })
  }, [])
  return category.map(item => {
    return (
      <option key={item.categoryID} value={item.categoryID}>{item.categoryName}</option>
    )
  })
}
function RenderUser() {
  let userURL = BaseURL() + "getMyProfile"
  const [userFullName, setFullName] = useState();
  let [message, setMessage] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    GetAPIToken(userURL).then(res => {
      setFullName(res.data.profile.userFullName)
      setMessage(res.data.message);
    })
  }, [])
  function logout() {
    let url = BaseURL() + "logout"
    PostAPINoBody(url).then(res => {
      if (res.status === 200) {
        sessionStorage.removeItem('auth')
        navigate('/login')
      }
    })
  }

  function popup() {
    let btnLogout = document.querySelector('.btn-logout')
    if (btnLogout.classList.contains('hide')) {
      btnLogout.classList.remove('hide')
    }
    else {
      btnLogout.classList.add('hide')
    }
    btnLogout.addEventListener('click', logout)
  }
  if (message === 'success') {
    return (
      <>
        <div className="avatar d-flex align-items-center">
          <p className='mb-0 fs-3 position-relative' onClick={popup}>
            Xin chào, {userFullName}
            <div className="btn btn-light fs-3 btn-logout position-absolute hide">Log out</div>
          </p>
        </div>
      </>
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
  const navigate = useNavigate()
  function GotoCart() {
    if (sessionStorage.getItem('auth') !== null) {
      navigate('/home/cart')
    }
    else {
      alert('Bạn phải đăng nhập để sử dụng chức năng này')
    }
  }
  return (
    <>
      <header className='navbar navbar-expand-lg bg-light justify-content-evenly shadow'>
        <Link className="navbar-brand fw-bold fs-3 text-uppercase" to='/home'>Koi Store</Link>
        <form action="" className='search-group d-flex'>
          <select id="catergory" name="catergory" className='p-3 bg-transparent fs-4 fw-bold border-0'>
            <option value="1">All Categories</option>
            <RenderCategory></RenderCategory>
          </select>
          <hr className='border border-dark ms-3' />
          <input type="text" className='search-input form-control fs-4 p-4 bg-transparent' placeholder='Search for items...' />
          <button type="submit" className='search-btn btn btn-dark fs-4'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <div onClick={GotoCart}>
          <button type="button" className="btn-cart btn btn-primary position-relative fs-4">
            <i className="fa-solid fa-cart-shopping"></i> <span className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2"><span className="visually-hidden">unread messages</span></span>
          </button>
        </div>
        <RenderUser></RenderUser>
      </header>
      <Outlet></Outlet>
    </>
  );
}

export default ShopHeader;