import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../styles/FishShop.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import sorryPic from '../assets/sorry.png'
import { MoneyFormat } from './helpers/DataFormat'
import { GetAPINoToken, PostAPINoBody } from './helpers/GlobalFunction'
import outStock from '../assets/213498-200.png'



function FishShop(props) {
  const location = useLocation();
  const [pageNum, setPageNum] = useState(0);
  const [productNumber, setProductNumber] = useState(0);
  const [currentPage, setCurrenPage] = useState(1)
  const [message, setMessage] = useState('');

  function RenderItem() {
    const [items, setItems] = useState([]);
    let url = location.state.name === "Koi Fish" ? "https://backend.f4koin.cyou/api/getOnlyFish?page=" + currentPage : "https://backend.f4koin.cyou/api/getFoodAndTools?page=" + currentPage
    useEffect(() => {
      GetAPINoToken(url).then(res => {
        setPageNum(res.data.product.last_page);
        setMessage(res.data.message);
        if (Array.isArray(res.data.product.data)) {
          setItems(res.data.product.data.slice());
        }
        else {
          let array = Object.values(res.data.product.data);
          setItems(array.slice());
        }
        setProductNumber(res.data.product.total);
      })
    }, [currentPage]);
    if (message === "Waiting" || message === '') {
      return (
        <>
          <p>Loading...</p>
        </>
      )
    }
    if (items.length === 0 && message === "success") {
      return (
        <>
          <div className='text-center mx-auto'>
            <p>Hiện tại mới có nhiêu đó à, bạn coi đỡ nha. Hic Hic :(</p>
            <img src={sorryPic} alt="" />
          </div>
        </>
      )
    }
    function sendtoCart(productID, productName) {
      return function (e) {
        e.preventDefault()
        let url = `https://backend.f4koin.cyou/api/addToCart?productID=${productID}&quantity=1`
        PostAPINoBody(url).then(res => {
          // console.log(res.data)
          if (res.data.message === 'success') {
            let popup = document.querySelector('.confirm-popup')
            popup.innerHTML = productName + " đã được thêm vào giỏ hàng";
            popup.style.display = 'block'
            popup.classList.add('fadeout')
            setTimeout(() => {
              popup.classList.remove('fadeout');
              popup.style.display = 'none'
            }, 7000)
          }
          else {
            let overlay = document.querySelector('.overlay')
            let overlayItems = document.querySelector('.overlay > .popup')
            overlay.style.display = 'flex'
            overlay.addEventListener('click', () => {
              overlay.style.display = 'none'
            })
          }
        });
      }
    }
    return items.map(item => {
      return (
        <>
          <Link className="fish-card col bg-dark pt-3 rounded text-decoration-none position-relative" to="/home/product" state={{ id: item.productID }}>
            <div className="card">
              <img className="card-img d-block h-50" src={item.imageUrl} alt="" />
            </div>
            <div>
              <h4 className="text-center text-white mt-3">Tên: {item.productName}</h4>
              <p className="text-center text-white">Giá: {MoneyFormat(item.productPrice)} VND</p>
            </div>
            <div onClick={sendtoCart(item.productID, item.productName)} className="position-absolute top-0 start-0 fs-3 text-white fw-bold btn btn-danger ms-1 mt-1 rounded">+</div>
          </Link>
        </>
      )
    })
  }
  useEffect(() => {
    const btns = document.querySelectorAll('.btn.btn-dark.fs-4.mx-3.fw-bold.pt-2');
    for (let i = 0; i < 5; i++) {
      btns[i].addEventListener('click', () => {
        setMessage("Waiting")
        setCurrenPage(Number(btns[i].innerHTML));
      })
    }
  })
  function RenderPage() {
    let numbers = [];
    for (let i = 0; i < 5; i++) {
      if (i === 3 && pageNum > 5) {
        numbers.push('...');
      }
      else {
        if (i === 4 && pageNum > 5) {
          numbers.push(pageNum);
        }
        else {
          numbers.push(i + 1);
        }
      }
    }
    return numbers.map(number => (
      <button className="btn btn-dark fs-4 mx-3 fw-bold pt-2" type="button">{number}</button>
    ))
  }
  return (
    <>
      <div className="px-5 pb-5 main_shop position-relative">
        <div id="pick-item" className="">
          <h1 className="header-1 text-center font-bold display-1 text-uppercase">{location.state.name}</h1>
          <em className="em-2 d-flex justify-content-center">Tất cả mọi thứ đều ở đây</em>
        </div>

        <div className="nav border-0 ps-5">
          <Link className="text-decoration-none fs-3 border-end border-dark pe-3 text-black" to="/home">Home page</Link>
          <div className="text-decoration-none fs-3 ps-3 text-black">{location.state.name}</div>
        </div>

        <h1 className="header-2 display-5 p-5 mb-5 fw-bold text-uppercase">{location.state.name} <span className="number-item font-italic display-6 fs-5">({productNumber})</span></h1>
        <div className="drop-gr d-flex justify-content-between align-items-center py-3 ps-3 border-solid border-top border-bottom">
          <div className="drop-main d-flex flex-row">
            <select name="gender" id="gender" className="form-select fs-4 me-5">
              <option value="" selected disabled hidden>Gender</option>
              <option value="1">Đực</option>
              <option value="2">Cái</option>
            </select>
            <select name="price" id="price" className="form-select fs-4 me-5">
              <option value="" selected disabled hidden>Price</option>
              <option value="1">Trên 5 triệu</option>
              <option value="2"> Dưới 5 triệu </option>
            </select>
          </div>
          <div className="drop-sub d-flex text-nowrap align-items-center">
            <p className="mb-0 fs-4 span-4 me-5">Sort By:</p>
            <select name="sort" id="sort" className="form-select fs-4">
              <option value="1">Tên (A-Z)</option>
              <option value="2">Giá (Cao Nhất)</option>
              <option value="3">Giá (Thấp Nhất)</option>
            </select>
          </div>
        </div>
        <div className="pb-5">
          <div className="row gy-4 row-cols-1 row-cols-md-4 w-100 m-0 justify-content-between">
            <RenderItem></RenderItem>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <i className="fa fa-arrow-left btn-next fs-2 me-3"></i>
          <RenderPage></RenderPage>
          <i className="fa fa-arrow-right btn-prev fs-2 ms-3"></i>
        </div>
        <div className="position-absolute confirm-popup fs-4">
          <p>Sản phẩm confirm</p>
        </div>
      </div>
      <div className="overlay">
        <p className="bg-white rounded p-5 text-center position-relative">
          <i className="fa-solid fa-xmark position-absolute top-0 end-0"></i>
          <i className="fa-solid fa-circle-xmark text-danger"></i>
          <br />
          Thêm sản phẩm thất bại!
          <br />
          Sản phẩm đã hết hàng hoặc ngừng kinh doanh
          <br />
          <img src={outStock} alt="" className="me-5" />
        </p>
      </div>
    </>
  );
}

export default FishShop;
