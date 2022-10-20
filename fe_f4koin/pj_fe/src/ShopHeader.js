import 'bootstrap/dist/css/bootstrap.min.css';
import './ShopHeader.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import avatar from './avt.png';
import { Outlet, Link } from 'react-router-dom'

function ShopHeader() {
  return (
    <>
      <header className='navbar navbar-expand-lg bg-light justify-content-evenly shadow'>
        <Link class="navbar-brand fw-bold fs-3 text-uppercase " to = '/home'>Koi Store</Link>
        <form action="" className='search-group d-flex'>
          <select id="cars" name="cars" className='p-3 bg-transparent fs-4 fw-bold'>
            <option value="1">All Categories</option>
            <option value="2">Fishs</option>
            <option value="3">Tools</option>
            <option value="4">Foods</option>
          </select>
          <hr className='border border-dark ms-3' />
          <input type="text" className='search-input form-control fs-4 p-4 bg-transparent' placeholder='Search for items...' />
          <button type="submit" className='search-btn btn btn-dark fs-4'>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <button type="button" class="btn-cart btn btn-primary position-relative fs-4">
          <i class="fa-solid fa-cart-shopping"></i> <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2"><span class="visually-hidden">unread messages</span></span>
        </button>
        <div className="avatar d-flex align-items-center">
          <img src={avatar} alt="" className='' />
          <i className="fa-solid fa-caret-down fs-3 ms-4"></i>
        </div>
        <button type="button" class="btn btn-dark fs-4 py-2">
          <i class="fa-solid fa-box fs-4 me-3"></i>
          Browse All Categories
        </button>
      </header>
      <Outlet></Outlet>
    </>
  );
}

export default ShopHeader;