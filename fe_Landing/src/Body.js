import './Body.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainPic from './koi.png';


function Header() {
  return (
    <div className="Main container-fluid d-flex justify-content-center align-items-center h-100 position-relative">
      <div className="d-flex flex-column mb-auto mt-auto position-absolute description">
        <h3 className='fw-bold'>Shop Bán cá Koi nè mua đi mua đi</h3>
        <br />
        <p className=''>Ở đây không chỉ có cá Koi
          <br />
          Ở đây còn có koin
          <br />
          Đừng có nhìn nữa mà mua lẹ koin
        </p>
        <br />
        <button className='btn btn-dark fs-1 fw-bold w-25 rounded-4'>Shop Now</button>
      </div>
      <img src={mainPic} className="ms-auto me-5 h-75" alt="" />
    </div>
  );
}

export default Header;