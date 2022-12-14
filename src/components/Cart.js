import React, { useState, useEffect, useRef, createRef } from 'react';
import '../styles/Cart.css'
import { GetAPIToken, BaseURL, PostAPINoBody, PostAPIToken } from './helpers/GlobalFunction'
import CartItem from './CartItem';
import fishingPic from '../assets/gofishing.png'
import { Link, useNavigate } from 'react-router-dom';



function App(props) {

  let listID = [];
  let listQuantities = [];
  const [cartID, setCartID] = useState('');
  const navigate = useNavigate()
  function RenderItem() {
    let cartURL = BaseURL() + "getCart"
    const [product, setProduct] = useState([]);
    useEffect(() => {
      GetAPIToken(cartURL).then(res => {
        setProduct(res.data.cart.slice())
        setCartID(res.data.cart[0].cartID)
      })
    }, []);
    if (product.length === 0) {
      return (
        <>
          <div className='text-center'>
            <img src={fishingPic} alt="" />
            <p className='text-center'>Có vẻ bạn chưa chọn sản phẩm nào</p>
            <p><Link to='/home'>Quay về cửa hàng</Link></p>
          </div>
        </>
      )
    }
    return product.map(item => {
      const itemRef = createRef(null)
      listID.push(item.productID)
      listQuantities.push(item.quantity)
      return (
        <>
          <CartItem ref={itemRef} imageUrl={item.imageUrl} productName={item.productName} productPrice={item.productPrice} productSex={item.productSex} productDiscount={item.productDiscount} productSize={item.productSize} quantity={item.quantity}></CartItem>
        </>
      )
    })
  }

  function HandlePayment() {
    let check = document.querySelectorAll('input[type=checkbox]')
    let ids = "";
    if (sessionStorage.getItem('auth') === null) {
      alert('Bạn phải đăng nhập để sử dụng chức năng này')
      return
    }
    for (let i = 0; i < check.length; i++) {
      // console.log("ID " + i + ": " + listID[i])
      if (check[i].checked) {
        // console.log("Item " + i + " id: " + listID[i] + "checked")
        if (ids === "") {
          ids = listID[i]
        }
        else {
          ids = ids + ',' + listID[i]
        }
      }
    }
    let url = BaseURL() + "createPreOrder"
    let body = {
      cart_id: cartID,
      product_id: ids
    }
    console.log(body)
    PostAPIToken(url, body).then(res => {
      if (res.data.message = "success") {
        navigate('/home/payment', {
          state: {
            id: res.data.recent_id
          }
        })
      }
    })
  }

  function HandleDelete() {
    let check = document.querySelectorAll('input[type=checkbox]')
    if (window.confirm('Xóa các sản phẩm đã chọn ?')) {
      for (let i = 0; i < check.length; i++) {
        // console.log("ID " + i + ": " + listID[i])
        if (check[i].checked) {
          // console.log("Item " + i + " id: " + listID[i] + "checked")
          let url = BaseURL() + "deleteFromCart?productID=" + listID[i] + "&quantity=" + listQuantities[i]
          console.log(url)
          try {
            PostAPINoBody(url).then(res => {
              if (res.data.message === 'success') {
                window.location.reload()
              }
            })
          } catch (error) {
            alert('Xóa các sản phẩm thất bại')
          }
        }
      }
    }
    else {

    }
  }

  return (
    <>
      <div className='p-5 main-cart'>
        <p className='text-uppercase m-5'>giỏ hàng</p>
        <div className='w-100 text-end'>
          <RenderItem></RenderItem>
          <div className='d-flex justify-content-end'>
            <div className='btn btn-primary fs-3 d-inline-block me-5' onClick={HandleDelete}>Loại Bỏ Sản Phẩm</div>
            <div to='/home/payment' className='btn btn-primary fs-3 d-inline-block me-5' onClick={HandlePayment}>Thanh Toán</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;