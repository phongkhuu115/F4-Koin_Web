import React, { useState, useEffect, useRef } from 'react';
import { GetAPINoToken } from '../helpers/GlobalFunction';
import Item from './Item'
import { BaseURL, PostAPIToken } from '../helpers/GlobalFunction';

function ProductsAdmin(props) {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNum, setPageNum] = useState(0);
  const [productNumber, setProductNumber] = useState(0);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null)
  let listID = [];

  function closePopup() {
    const overlay = document.querySelector('.edit-popup')
    overlay.style.display = 'none'
  }

  function selectAll(e) {
    let checkBoxs = document.querySelectorAll('.item-box')
    console.log(e)
    if (e === true) {
      for (let i = 0; i < checkBoxs.length; i++) {
        checkBoxs[i].checked = true;
      }
    }
    else {
      for (let i = 0; i < checkBoxs.length; i++) {
        checkBoxs[i].checked = false;
      }
    }
  }

  function handleDelete() {
    let url = BaseURL() + "deleteItem"
    let ids = ""
    // console.log(listID);
    let checkBoxs = document.querySelectorAll('.item-box')
    for (let i = 0; i < checkBoxs.length; i++) {
      if (checkBoxs[i].checked === true) {
        if (ids === "") {
          ids = listID[i];
        }
        else {
          ids = ids + "," + listID[i]
        }
      }
    }
    let body = {
      id: ids
    }
    console.log(ids)
    PostAPIToken(url, body).then(res => {
      console.log(res.data)
      if (res.data.message === "success") {
        window.location.reload();
      }
    })
  }


  useEffect(() => {
    let url = "https://backend.f4koin.cyou/api/getOnlyFish?page=" + currentPage;
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
  }, []);

  // const [id, setID] = useState('')
  // const [newName, setNewName] = useState('')
  // const [newName, setNewName] = useState('')
  // const [newName, setNewName] = useState('')
  // const [newName, setNewName] = useState('')
  // const [newName, setNewName] = useState('')
  // const [newName, setNewName] = useState('')

  function gotoPage(e) {
    if (e.keyCode === 13) {
      if (e.target.value > pageNum || e.target.value < 1) {
        return
      }
      let url = "https://backend.f4koin.cyou/api/getOnlyFish?page=" + e.target.value;
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
    }
  }

  function nextPage() {
    let value = Number(inputRef.current.value) + 1
    if (value > pageNum) {
      return
    }
    let url = "https://backend.f4koin.cyou/api/getOnlyFish?page=" + value;
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
      inputRef.current.value = value
    })
  }

  function prevPage() {
    let value = Number(inputRef.current.value) - 1
    if (value < 1) {
      return
    }
    let url = "https://backend.f4koin.cyou/api/getOnlyFish?page=" + value;
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
      inputRef.current.value = value
    })
  }

  function handleUpdate() {

  }

  return (
    <>
      <div className='d-flex bg-white justify-content-between align-items-center'>
        <p className='mb-0 p-4 fw-bold text-danger'>F4 Koin</p>
      </div>
      <p className='m-5'>Sản phẩm</p>
      <div className='bg-white m-5 rounded-1 p-4'>
        <div className='btn btn-primary fs-3'>Thêm Sản Phẩm</div>
        <div onClick={handleDelete} className='ms-3 btn btn-danger fs-3'>Xóa Sản Phẩm</div>
        <div className='d-flex align-items-center mt-4 border-bottom border-top'>
          <input onClick={(e) => selectAll(e.target.checked)} type="checkbox" name="main-checkbox" id="main-checkbox" className='me-5' />
          <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>Tên</p>
          <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>Giống</p>
          <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>Số lượng</p>
          <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>Kích thước</p>
          <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>
            Giá
          </p>
          <p className='text-muted fs-2 fw-semibold mb-0 product__col-status text-center'>Tình trạng</p>
          <p className='text-muted fs-2 fw-semibold mb-0'>&ensp;</p>
        </div>
        {items.map(item => {
          listID.push(item.productID)
          return (
            <Item id={item.productID} name={item.productName} sex={item.productSex} size={item.productSize} quantity={item.productSupplierID} status={item.productSupplierID > 0 ? "Còn hàng" : "Hết hàng"} price={item.productPrice}></Item>
          )
        })}
        <div className='d-flex align-items-center justify-content-center mt-4'>
          <i className="fa fa-arrow-left btn-next fs-2 me-3" onClick={prevPage}></i>
          <input onKeyDown={e => gotoPage(e)} ref={inputRef} type="text" name="" id="page__number" defaultValue={1} className='fs-3 text-center' />
          <i className="fa fa-arrow-right btn-prev fs-2 ms-3" onClick={nextPage}></i>
        </div>
      </div>
      <div className="edit-popup">
        <div className="bg-white rounded p-5 edit-section position-relative">
          <div className='close-btn p-3 fs-3' onClick={closePopup}>
            <i class="fa-solid fa-xmark"></i>
          </div>
          <p className='my-5 text-center text-muted fs-2'>Cập nhật sản phẩm</p>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productName" className='fs-3 me-5 edit-label'>Tên</label>
            <input type="text" name="productName" id="productName" onChange={e => { }} className='form-control fs-3' />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productSex" className='fs-3 me-5 edit-label'>Giống</label>
            <input type="text" name="productSex" id="productSex" className='form-control fs-3' />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="quantity" className='fs-3 me-5 edit-label'>Số lượng</label>
            <input type="text" name="quantity" id="quantity" className='form-control fs-3' />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productSize" className='fs-3 me-5 edit-label'>Kích thước</label>
            <input type="text" name="productSize" id="productSize" className='form-control fs-3' />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productPrice" className='fs-3 me-5 edit-label'>Giá</label>
            <input type="text" name="productPrice" id="productPrice" className='form-control fs-3' />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productStatus" className='fs-3 me-5 edit-label'>Tình trạng</label>
            <input type="text" name="productStatus" id="productStatus" className='form-control fs-3' />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productStatus" className='fs-3 me-5 edit-label'>Tình trạng</label>
            <input type="file" name="productStatus" id="productStatus" className='form-control fs-2' />
          </div>
          <div className='text-center'>
            <div className='btn btn-primary fs-2 mt-2' onClick={handleUpdate}>
              Cập nhật
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsAdmin;