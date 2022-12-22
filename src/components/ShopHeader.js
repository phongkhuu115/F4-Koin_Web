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
            <span className="btn btn-light fs-3 btn-logout position-absolute hide">Log out</span>
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

  let [searchItem, setSearchItem] = useState([]);
  let [searchCate, setSearchCate] = useState('');
  let [searchName, setSearchName] = useState('');

  window.addEventListener('click', function (e) {   
    let menu = document.querySelector('.search-menu')
    if (menu.contains(e.target)){
      // Clicked in box
    } else {
      if (!menu.classList.contains('hide')) {
        menu.classList.add('hide')
      }
    }
  });

  function searchByNameAndCate(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      let menu = document.querySelector('.search-menu')
      menu.classList.remove('hide')
      console.log('enter')
      let url = BaseURL() + `getItemByNameAndCategory?input_name=${searchName}&input_category=${searchCate}&page=1&action=DescTime`
      GetAPINoToken(url).then(res => {
        if (Array.isArray(res.data.product.data)) {
          setSearchItem(res.data.product.data.slice());
        }
        else {
          let array = Object.values(res.data.product.data);
          setSearchItem(array.slice());
        }
        console.log(res.data)
      })
    }
  }
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
      <header className='navbar navbar-expand-lg bg-light justify-content-evenly shadow position-relative'>
        <Link to='/home/info' className='btn position-absolute end-0 fs-3'>
          <i class="fa-solid fa-gear"></i>
        </Link>
        <Link className="navbar-brand fw-bold fs-3 text-uppercase" to='/home'>Koi Store</Link>
        <form onSubmit={e => e.preventDefault()} onKeyDown={e => searchByNameAndCate(e)} action="" className='search-group d-flex'>
          <select id="catergory" name="catergory" className='p-3 bg-transparent fs-4 fw-bold border-0' onChange={e => setSearchCate(e.target.value)}>
            <option value="1">All Categories</option>
            <RenderCategory></RenderCategory>
          </select>
          <hr className='border border-dark ms-3' />
          <input type="text" className='search-input form-control fs-4 p-4 bg-transparent' defaultValue={''} placeholder='Search for items...' onChange={e => setSearchName(e.target.value)} />
          <button type="submit" className='search-btn btn btn-dark fs-4'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <div className='search-menu flex-column bg-white rounded-3 shadow-sm hide'>
          {searchItem.map(item => {
            return (
              <>
                <Link to='/home/product' className='search-item m-3 btn text-start' state={{ id: item.productID }}>
                  <p className='text-decoration-none text-black fs-4 mb-0 p-3'>{item.productName}</p>
                </Link>
              </>
            )
          })}
        </div>
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