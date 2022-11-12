import '../styles/Body.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import fishPic from '../assets/koi.png';
import foodPic from '../assets/fishfood.jpg';
import toolPic from '../assets/fishtool.jpg';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';


function Header() {
  const slides = [fishPic, toolPic, foodPic];
  return (
    <>
      <div className="Main container-fluid d-flex justify-content-center align-items-center h-100 position-relative">
        <div className="d-flex flex-column mb-auto mt-auto position-absolute description">
          <h3 className='fw-bold'>Shop Bán cá Koi nè mua đi mua đi</h3>
          <br />
          <p className=''>Ở đây không chỉ có cá Koi
            <br />
            Ở đây còn có Koin
            <br />
            Đừng có nhìn nữa mà mua lẹ Koin
          </p>
          <br />
          <Link to='/home' className='d-inline-block w-25'>
            <button className='btn btn-dark fs-1 fw-bold rounded-4'>Shop Now</button>
          </Link>
        </div>
        <div className="ms-auto me-5 w-50 h-75" id='slides-container'>
          {slides.map(slide => {
            return (
              <img src={slide} alt="" className='w-100 h-100 fade' id='slidesPic' />
            );
          })}
          <div id="dot-container" className='d-flex justify-content-center mt-4'>
            {slides.map(slide => {
              return (
                <div className='dot rounded-circle p-2 mx-2' id='dot'></div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;