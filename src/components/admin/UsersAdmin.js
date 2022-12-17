import React, { useState, useEffect, useRef } from 'react';
import { GetAPINoToken } from '../helpers/GlobalFunction';
import User from './User'
import { BaseURL, PostAPIToken, GetAPIToken } from '../helpers/GlobalFunction';

function ProductsAdmin(props) {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNum, setPageNum] = useState(0);
  const [productNumber, setProductNumber] = useState(0);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null)
  let listID = [];

  function closeItemPopup() {
    const overlay = document.querySelector('.edit-popup')
    overlay.style.display = 'none'
  }

  function closeUserPopup() {
    const overlay = document.querySelector('.user-popup')
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
    let url = BaseURL() + "deleteUser"
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
    if (ids === "") return
    PostAPIToken(url, body).then(res => {
      console.log(res.data)
      if (res.data.message === "success") {
        window.location.reload();
      }
    })
  }


  useEffect(() => {
    let url = "https://backend.f4koin.cyou/api/getAllUser?page=" + currentPage;
    GetAPIToken(url).then(res => {
      setPageNum(res.data.user.last_page);
      setMessage(res.data.message);
      if (Array.isArray(res.data.user.data)) {
        setItems(res.data.user.data.slice());
      }
      else {
        let array = Object.values(res.data.user.data);
        setItems(array.slice());
      }
      setProductNumber(res.data.user.total);
    })
  }, []);

  function gotoPage(e) {
    if (e.keyCode === 13) {
      if (e.target.value > pageNum || e.target.value < 1) {
        return
      }
      let url = "https://backend.f4koin.cyou/api/getAllUser?page=" + e.target.value;
      GetAPIToken(url).then(res => {
        setPageNum(res.data.user.last_page);
        setMessage(res.data.message);
        if (Array.isArray(res.data.user.data)) {
          setItems(res.data.user.data.slice());
        }
        else {
          let array = Object.values(res.data.user.data);
          setItems(array.slice());
        }
        setProductNumber(res.data.user.total);
      })
    }
  }

  function nextPage() {
    let value = Number(inputRef.current.value) + 1
    if (value > pageNum) {
      return
    }
    let url = "https://backend.f4koin.cyou/api/getAllUser?page=" + value;
    GetAPIToken(url).then(res => {
      setPageNum(res.data.user.last_page);
      setMessage(res.data.message);
      if (Array.isArray(res.data.user.data)) {
        setItems(res.data.user.data.slice());
      }
      else {
        let array = Object.values(res.data.user.data);
        setItems(array.slice());
      }
      setProductNumber(res.data.user.total);
      inputRef.current.value = value
    })
  }

  function prevPage() {
    let value = Number(inputRef.current.value) - 1
    if (value < 1) {
      return
    }
    let url = "https://backend.f4koin.cyou/api/getAllUser?page=" + value;
    GetAPIToken(url).then(res => {
      setPageNum(res.data.user.last_page);
      setMessage(res.data.message);
      if (Array.isArray(res.data.user.data)) {
        setItems(res.data.user.data.slice());
      }
      else {
        let array = Object.values(res.data.user.data);
        setItems(array.slice());
      }
      setProductNumber(res.data.user.total);
      inputRef.current.value = value
    })
  }

  // Insert Vars
  const [username, setUsername] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userFullName, setUserFullName] = useState();
  const [userTelephone, setUserTelePhone] = useState();
  const [userRoleID, setUserRoleID] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();

  function handleInsert() {
    if (password !== confirm) return
    let url = BaseURL() + "insertUser"
    let body = {
      username: username,
      userEmail: userEmail,
      userFullName: userFullName,
      userTelephone: userTelephone,
      password: password,
      password_confirmation: confirm,
      userRoleID: userRoleID
    }
    PostAPIToken(url, body).then(res => {
      console.log(res.data)
    })
  }

  function handleUpdate() {

  }

  function handleAddUser() {
    const overlay = document.querySelector('.user-popup')
    overlay.style.display = 'flex'
  }

  return (
    <>
      <div className='d-flex bg-white justify-content-between align-items-center'>
        <p className='mb-0 p-4 fw-bold text-danger'>F4 Koin</p>
      </div>
      <p className='m-5'>Sản phẩm</p>
      <div className='bg-white m-5 rounded-1 p-4'>
        <div onClick={handleAddUser} className='btn btn-primary fs-3'>Thêm Người Dùng</div>
        <div onClick={handleDelete} className='ms-3 btn btn-danger fs-3'>Xóa Sản Phẩm</div>
        <div className='d-flex align-items-center mt-4 border-bottom border-top'>
          <input onClick={(e) => selectAll(e.target.checked)} type="checkbox" name="main-checkbox" id="main-checkbox" className='me-5' />
          <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>Tên đầy đủ</p>
          <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>Email</p>
          <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>Tài khoản</p>
          <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>Số điện thoại</p>
          <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>
            Vai trò
          </p>
          <p className='text-muted fs-2 fw-semibold mb-0'>&ensp;</p>
        </div>
        {items.map(item => {
          listID.push(item.userID)
          return (
            <User id={item.userID} name={item.userFullName} email={item.userEmail} phone={item.userTelephone} username={item.username} role={item.userRoleID == 3 ? "User" : "Admin"} ></User>
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
          <div className='close-btn p-3 fs-3' onClick={closeItemPopup}>
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
      {/* Insert new User */}
      <div className="user-popup">
        <div className="bg-white rounded p-5 edit-section position-relative">
          <div className='close-btn p-3 fs-3' onClick={closeUserPopup}>
            <i class="fa-solid fa-xmark"></i>
          </div>
          <p className='my-5 text-center text-muted fs-2'>Thêm người dùng</p>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="username" className='fs-3 me-5 user-label'>Tên tài khoản</label>
            <input type="text" name="username" id="username" onChange={e => setUsername(e.target.value)} className='form-control fs-3' />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="email" className='fs-3 me-5 user-label'>Email</label>
            <input type="text" name="email" id="email" className='form-control fs-3' onChange={e => setUserEmail(e.target.value)}/>
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="fullname" className='fs-3 me-5 user-label'>Tên đầy đủ</label>
            <input type="text" name="fullname" id="fullname" className='form-control fs-3' onChange={e => setUserFullName(e.target.value)}/>
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="phone" className='fs-3 me-5 user-label'>Số Điện Thoại</label>
            <input type="text" name="phone" id="phone" className='form-control fs-3' onChange={e => setUserTelePhone(e.target.value)}/>
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="password" className='fs-3 me-5 user-label'>Mật Khẩu</label>
            <input type="password" name="password" id="password" className='form-control fs-3' onChange={e => setPassword(e.target.value)}/>
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="confirm" className='fs-3 me-5 user-label'>Xác nhận mật khẩu</label>
            <input type="password" name="confirm" id="confirm" className='form-control fs-3' onChange={e => setConfirm(e.target.value)}/>
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="role" className='fs-3 me-5 user-label'>Vai trò</label>
            <select name="role" id="role" className='form-select fs-3' onChange={e => setUserRoleID(e.target.value)}>
              <option value="1">Admin</option>
              <option value="3">User</option>
            </select>
          </div>
          <div className='text-center'>
            <div className='btn btn-primary fs-3 mt-2' onClick={handleInsert}>
              Thêm
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsAdmin;