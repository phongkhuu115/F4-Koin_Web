import './Body.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import fishPic from './koi.png';
import foodPic from './fishfood.jpg';
import toolPic from './fishtool.jpg';
import { Link } from 'react-router-dom'
import { useEffect, useLayoutEffect, useState } from 'react';


var slides = [fishPic, toolPic, foodPic];

function Header() {
  const [index, setIndex] = useState(0);

  useLayoutEffect(() => {
    var pics = document.querySelectorAll('#slidesPic')
    var dots = document.querySelectorAll('#dot')
    pics[index % 3].style.display = 'block';
    dots[index % 3].classList.add('bg-secondary');
    setTimeout(() => {
      pics[index % 3].style.display = 'none'
      dots[index % 3].classList.remove('bg-secondary');
      setIndex(index + 1);
    }, 4000)
  }, [index])
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
          <Link to='/' className='d-inline-block w-25'>
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