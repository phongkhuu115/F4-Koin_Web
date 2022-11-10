import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../FishShop.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
function FishShop(props) {
  const location = useLocation();
  const [pageNum, setPageNum] = useState(0);
  const [productNumber, setProductNumber] = useState(0);
  const [currentPage, setCurrenPage] = useState(1)
  let getItem = async (url) => {
    let data = await axios(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data;
  }
  function RenderItem() {
    const [items, setItems] = useState([]);
    useEffect(() => {
      let url = 'http://be.f4koin.cyou/api/getAllItem?page=' + currentPage
      getItem(url).then(res => {
        setPageNum(res.data.product.last_page);
        // setItems(res.data.product.data.slice());
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
    return items.map(item => {
      return (
        <>
          <div className="col order-md-first">
            <div className="card">
              <img className="card-img w-100 d-block" src={item.imageUrl} alt="" />
            </div>
            <div>
              <h4 className="text-center" >{item.productName}</h4>
              <p className="text-center">{item.productPrice}</p>
            </div>
          </div>
        </>
      )
    })
  }
  useEffect(() => {
    const btns = document.querySelectorAll('.btn.btn-dark.fs-4.mx-3.fw-bold.pt-2');
    for (let i = 0; i < pageNum; i++) {
      btns[i].addEventListener('click', () => {
        setCurrenPage(i + 1);
      })
    }
  })
  function RenderPage() {
    let numbers = [];
    for (let i = 0; i < pageNum; i++) {
      numbers.push(i + 1);
    }
    return numbers.map(number => (
      <button className="btn btn-dark fs-4 mx-3 fw-bold pt-2" type="button">{number}</button>
    ))
  }
  return (
    <>
      <div className="px-5">
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
            <div className="dropdown">
              <button className="btn btn-dark dropdown-toggle drop-item-btn fs-4" aria-expanded="false" data-bs-toggle="dropdown" type="button">
                Gender </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#top">First Item</a>
                <a className="dropdown-item" href="#top">Second Item</a>
                <a className="dropdown-item" href="#top">Third Item</a>
              </div>
            </div>
            <div className="dropdown">
              <button className="btn btn-dark dropdown-toggle drop-item-btn fs-4" aria-expanded="false" data-bs-toggle="dropdown" type="button">
                Color </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#top">First Item</a>
                <a className="dropdown-item" href="#top">Second Item</a>
                <a className="dropdown-item" href="#top">Third Item</a>
              </div>
            </div>
            <div className="dropdown">
              <button className="btn btn-dark dropdown-toggle drop-item-btn fs-4" aria-expanded="false" data-bs-toggle="dropdown" type="button">
                Size </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#top">First Item</a>
                <a className="dropdown-item" href="#top">Second Item</a>
                <a className="dropdown-item" href="#top">Third Item</a>
              </div>
            </div>
            <div className="dropdown">
              <button className="btn btn-dark dropdown-toggle drop-item-btn fs-4" aria-expanded="false" data-bs-toggle="dropdown" type="button">
                Price
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#top">First Item</a>
                <a className="dropdown-item" href="#top">Second Item</a>
                <a className="dropdown-item" href="#top">Third Item</a>
              </div>
            </div>
          </div>
          <div className="drop-sub d-flex justify-content-between align-items-center">
            <ul className="list-group " >
              <li className="list-group-item" ><span className="span-4">Sort By:</span></li>
            </ul>
            <div className="dropdown">
              <button className="btn btn-dark dropdown-toggle drop-item-btn fs-4" aria-expanded="false" data-bs-toggle="dropdown" type="button" >
                Dropdown </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#top">First Item</a>
                <a className="dropdown-item" href="#top">Second Item</a>
                <a className="dropdown-item" href="#top">Third Item</a>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-category-group p-5" role="group">
          <button className="btn btn-dark btn-close-category px-4 text-uppercase" type="button">
            {location.state.name}<i className="fa-solid fa-xmark ms-3"></i>
          </button>
          <a className="btn-category-group p-5" href="#top">Clear all</a>
        </div>

        <div className="py-4 py-xl-5">
          <div className="row gy-4 row-cols-1 row-cols-md-4 w-100">
            <RenderItem currentPage='1'></RenderItem>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <i className="fa fa-arrow-left btn-next fs-2 me-3"></i>
          <RenderPage></RenderPage>
          <i className="fa fa-arrow-right btn-prev fs-2 ms-3"></i>
        </div>
      </div>
    </>
  );
}

export default FishShop;
