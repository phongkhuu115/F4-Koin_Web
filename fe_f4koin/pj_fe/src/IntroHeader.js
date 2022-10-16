import './IntroHeader.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Outlet, Link } from 'react-router-dom'

function openMenu() {
  var menu = document.querySelector('ul.dropdown-menu');
  if (menu.style.display === 'none') {
    menu.style.display = 'block';
  }
  else {
    menu.style.display = 'none';
  }
}

function IntroHeader() {
  return (
    <>
      <div className="IntroHeader">
        <header className="navbar container-fluid p-3">
          <div className="header-logo d-flex align-items-center">
            <Link to='/' className='text-decoration-none'>
              <div className="ms-5 me-3 px-4 py-3 bg-dark text-light fs-2">F4</div>
            </Link>
            <Link to='/' className="navbar-brand ms-4 text-uppercase fw-bold fs-2">Koi Store</Link>
          </div>
          <ul className="navbar-nav me-auto d-flex flex-row ms-4">
            <li className="nav-item me-5 rounded"><a href="#" className="nav-link active px-4 py-2 fs-4 hoverEffect">Home</a></li>
            <li className="nav-item me-5 rounded"><a href="#" className="nav-link active px-4 py-2 fs-4 hoverEffect">Product</a></li>
            <li className="nav-item me-5 rounded"><a href="#" className="nav-link active px-4 py-2 fs-4 hoverEffect">About Us</a></li>
            <li className="nav-item me-5 rounded"><a href="#" className="nav-link active px-4 py-2 fs-4 hoverEffect">Sale</a></li>
          </ul>
          <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle me-5 fs-4 position-relative" type="button" aria-expanded="false" onClick={openMenu}>
              <i class="fa-regular fa-user"></i>
              <ul class="action-menu dropdown-menu dropdown-menu-primary position-absolute mt-3 rounded-3 p-2">
                <li><Link class="dropdown-item fs-4" to='/login'>Log In</Link></li>
                <li><Link class="dropdown-item fs-4" to='/signup'>Sign Up</Link></li>
              </ul>
            </button>
          </div>
        </header>
      </div>
      <Outlet />
    </>
  );
}

export default IntroHeader;
