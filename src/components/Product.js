import React, { useState, useEffect } from 'react';
import fishPic from '../assets/koi.png'
import mainLogo from '../assets/mainlogo.png'
import '../styles/Product.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { GetToken } from '../components/helper/GlobalFunction'

function Product(props) {
  const location = useLocation();
  let getItem = async () => {
    let url = "https://backend.f4koin.cyou/api/getSpecifyItem?productID=" + location.state.id;
    let data = await axios(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data;
  }
  let AddToCart = async (url) => {
    let data = await axios(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GetToken()}`
      },
    })
    return data;
  }

  function SendToCart() {
    let url = `https://backend.f4koin.cyou/api/addToCart?productID=${location.state.id}&quantity=1`
    console.log(url);
    AddToCart(url).then(res => console.log(res.data.message));
  }
  function RenderItem() {
    const [item, setItem] = useState(0);
    useEffect(() => {
      console.log(item.productInventory)
      getItem().then(res => {
        setItem(res.data.product[0]);
      })
    }, []);
    return (
      <>
        <div className='w-50 m-auto text-center position-relative'>
          <img src={item.imageUrl} alt="" className='w-50 product_img' />
        </div>
        <div className='w-50 p-5 position-relative border-start d-flex'>
          <div className='h-100'>
            <p className='text-uppercase fs-1'>{item.productName} <span className='fs-3'>(Còn <span className='fw-bold text-danger'>{typeof item.productInventory === 'undefined' ? 0 : item.productInventory}</span> sản phẩm trong kho)</span></p>
            <div className='bg-light p-3 rounded'>
              <p>Giá: <b>{item.productPrice * 24815.00} VND</b></p>
              <div className='bg-danger d-inline-block text-white fs-2 rounded p-2'>- {item.productDiscount}%</div>
            </div>
            <p>Giới tính: <b>{item.productSex === "Male" ? "Đực" : "Cái"}</b></p>
            <p>Kích thước: <b>{item.productSize}</b></p>
            <p>{item.productDetail}</p>
            <p className='mt-2'>Số lượng: </p>
            <div className='d-flex'>
              <div id="decrease" onClick={decreaseValue} value="Decrease Value" className='value-button btn fs-3 px-4'>-</div>
              <input type="text" id="number" value="0" className='fs-4' />
              <div id="increase" onClick={increaseValue} value="Increase Value" className='value-button btn fs-3 px-4'>+</div>
            </div>
          </div>
          <div className='d-flex position-absolute bottom-0 w-100'>
            <button className='text-uppercase fs-1 btn btn-dark flex-grow-1 mx-3 py-2 fw-bold ms-0'>buy now</button>
            <button onClick={SendToCart} className='text-uppercase fs-1 btn btn-dark flex-grow-1 py-2 fw-bold me-5'>add to cart</button>
          </div>
          <img src={mainLogo} alt="" className='sticker position-absolute top-0 end-0 ' />
        </div>
      </>
    )
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
      <p className='mt-5 ms-5 ms-4 fs-3'><span className='border-end border-dark pe-2'>Home</span><span className='ps-2'>Product</span></p>
      <div className='d-flex m-5 p-5 border bg-white rounded'>
        <RenderItem></RenderItem>
      </div>
    </>
  )
}

export default Product;