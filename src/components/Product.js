import React, { useState, useEffect } from 'react';
import fishPic from '../koi.png'
import axios from 'axios';

function Product(props) {
  const [state, setState] = useState(''); 
  let [items, setItems] = useState([]);
  useEffect(() => {
    
  }, []);

  return (
    <>
      <p className='mt-5 ms-4 fs-3'><span className='border-end pe-2'>Home</span><span className='ps-2'>Product</span></p>
      <div className='d-flex mt-5'>
        <img src={ fishPic} alt="" className='w-50 border-end'/>
        <div className='w-50 p-4'>
          <p className='text-uppercase fs-1'>Cá Koi Phú Quốc</p>
          <p>Price something</p>
          <div className='d-flex'>
            <button className='text-uppercase fs-1 btn btn-dark'>buy now</button>
            <button className='text-uppercase fs-1 btn btn-dark'>add to cart</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product;