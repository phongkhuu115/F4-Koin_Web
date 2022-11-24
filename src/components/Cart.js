import React, { useState, useEffect } from 'react';
import '../styles/Cart.css'
import koi from '../assets/koi.png'
import axios from 'axios';

var jwt = localStorage.getItem('auth')
var token;
if (jwt !== null) {
  token = jwt.substring(2)
}


let getProduct = async () => {
  let url = "https://backend.f4koin.cyou/api/getCart"
  let data = await axios(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return data;
}



function App(props) {
  const [product, setProduct] = useState([]);
  function RenderItem() {
    useEffect(() => {
      getProduct().then(res => setProduct(res.data.cart.slice()))
    }, []);
    return product.map(item => { 
      return (
        <>
          <div className='m-5 bg-white p-5 rounded d-flex text-start'>
          <img src={item.imageUrl} alt="" className='cart__item-img' />
          <div className='d-flex justify-content-between w-100'>
            <div className='d-flex flex-column ms-3 my-auto'>
                <p className='text-uppercase' style={{ minWidth: 300 }}>{ item.productName}</p>
                <p>{ item.productPrice} vnd</p>
                <div className='d-flex'><span className='bg-primary text-white fs-3 px-3 py-2 text-uppercase fw-bold rounded'>{item.productSex === "Female" ? "Cái" : "Đực"}</span><span className='bg-danger text-white fs-3 px-3 py-2 text-uppercase fw-bold rounded ms-2'>{ item.productDiscount}</span><span className='bg-success text-white fs-3 px-3 py-2 text-uppercase fw-bold rounded ms-2'>{ item.productSize === null ? 0 : item.productSize}</span></div>
            </div>
            <div className='me-auto my-auto ms-5'>
              <div className='d-flex'>
                <div id="decrease" onClick={decreaseValue} value="Decrease Value" className='value-button btn fs-3 px-4'>-</div>
                  <input type="text" id="number" value={ item.quantity} className='fs-4' />
                <div id="increase" onClick={increaseValue} value="Increase Value" className='value-button btn fs-3 px-4'>+</div>
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <input type="checkbox" name="pick"></input>
            </div>
          </div>
        </div>
        </>
      )
    })
}

function increaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value--;
  value = value <= 0 ? 0 : value;
  document.getElementById('number').value = value;
}


return (
  <>
    <div className='p-5 main-cart'>
      <p className='text-uppercase m-5'>giỏ hàng</p>
      <div className='w-100 text-end'>
        {/* <div className='m-5 bg-white p-5 rounded d-flex'>
          <img src={koi} alt="" className='cart__item-img' />
          <div className='d-flex justify-content-between w-100'>
            <div className='d-flex flex-column ms-3 my-auto'>
              <p className='text-uppercase'>Cá koi gì đó</p>
              <p>220.000 vnd</p>
              <div className='d-flex'><span className='bg-primary text-white fs-3 px-3 py-2 text-uppercase fw-bold rounded'>Đực</span><span className='bg-danger text-white fs-3 px-3 py-2 text-uppercase fw-bold rounded ms-2'>17.8</span></div>
            </div>
            <div className='me-auto my-auto ms-5'>
              <div className='d-flex'>
                <div id="decrease" onClick={decreaseValue} value="Decrease Value" className='value-button btn fs-3 px-4'>-</div>
                <input type="text" id="number" value="0" className='fs-4' />
                <div id="increase" onClick={increaseValue} value="Increase Value" className='value-button btn fs-3 px-4'>+</div>
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <input type="checkbox" name="pick"></input>
            </div>
          </div>
        </div> */}
        <RenderItem></RenderItem>
        <div className='btn btn-primary fs-3 d-inline-block me-5'>Thanh Toán</div>
      </div>
    </div>
  </>
)
}

export default App;