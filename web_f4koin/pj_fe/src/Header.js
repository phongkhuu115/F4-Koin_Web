import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <div className="Header">
      <header className="navbar container-fluid p-3">
        <div className="header-logo d-flex align-items-center">
          <div className="ms-5 me-3 px-4 py-3 bg-dark text-light fs-2">
            F4
          </div>
          <a href="" className="navbar-brand ms-4 text-uppercase fw-bold fs-2">Koi Store</a>
        </div>
        <ul className="navbar-nav me-auto d-flex flex-row ms-4">
          <li className="nav-item me-5 rounded"><a href="#" className="nav-link active px-4 py-2 fs-4 hoverEffect">Home</a></li>
          <li className="nav-item me-5 rounded"><a href="#" className="nav-link active px-4 py-2 fs-4 hoverEffect">Product</a></li>
          <li className="nav-item me-5 rounded"><a href="#" className="nav-link active px-4 py-2 fs-4 hoverEffect">About Us</a></li>
          <li className="nav-item me-5 rounded"><a href="#" className="nav-link active px-4 py-2 fs-4 hoverEffect">Sale</a></li>
        </ul>
        <i class="fa-regular fa-user fs-3 me-5"></i>
      </header>
    </div>
  );
}

export default Header;
