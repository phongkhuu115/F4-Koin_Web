import React, { useState, useEffect, useRef } from 'react';
import '../../styles/DashBoard.css'
import { BaseURL, GetAPIToken, PostAPINoBody } from '../helpers/GlobalFunction';
import { MoneyFormat, UUID_Format } from '../helpers/DataFormat';
import Order from './Order'
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { } from '../../components/helpers/GlobalFunction'

function DashBoard(props) {
  const [profile, setProfile] = useState({
    userFullName: "admin",
    userAvatar: "https://img.freepik.com/premium-vector/cute-kitten-sticker-red-cat-avatar-cartoon-face-style-kawaii-vector-illustration_361213-995.jpg?w=2000",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [dayProfit, setDayProfit] = useState(1);
  const [monthProfit, setMonthProfit] = useState(1);
  const [yearProfit, setYearProfit] = useState(1);
  const [pageNum, setPageNum] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  let listID = [];
  let checkBoxs = [];

  const Pending = 'bg-warning text-orange'
  const Delivering = 'bg-info text-blue'
  const Delivered = 'bg-success text-green'
  const Bomb = 'bg-danger text-red'

  useEffect(() => {
    let url = BaseURL() + "getMyProfile"
    GetAPIToken(url).then(res => {
      setProfile(res.data.profile)
      if (profile.userFullName !== 'admin') {
        navigate('/home')
      }
    })
  }, [])

  const [orders, setOrders] = useState([{
    order_id: "1",
    order_status: "Waiting",
    order_tinhtien: "200000"
  }, {
    order_id: "1",
    order_status: "Waiting",
    order_tinhtien: "200000"
  }]);
  useEffect(() => {
    let url = BaseURL() + "getAllOrder?page=" + currentPage
    GetAPIToken(url).then(res => {
      setPageNum(res.data.orders.last_page);
      if (Array.isArray(res.data.orders.data)) {
        setOrders(res.data.orders.data)
      }
      else {
        let array = Object.values(res.data.orders.data);
        setOrders(array.slice());
      }
    })
  }, [])
  function nextPage() {
    let value = Number(inputRef.current.value) + 1
    if (value > pageNum) {
      return
    }
    let url = "https://backend.f4koin.cyou/api/getAllOrder?page=" + value;
    GetAPIToken(url).then(res => {
      if (Array.isArray(res.data.orders.data)) {
        setOrders(res.data.orders.data)
      }
      else {
        let array = Object.values(res.data.orders.data);
        setOrders(array.slice());
      }
      inputRef.current.value = value
    })
  }

  function gotoPage(e) {
    if (e.keyCode === 13) {
      if (e.target.value > pageNum || e.target.value < 1) {
        return
      }
      let url = "https://backend.f4koin.cyou/api/getAllOrder?page=" + e.target.value;
      GetAPIToken(url).then(res => {
        if (Array.isArray(res.data.orders.data)) {
          setOrders(res.data.orders.data)
        }
        else {
          let array = Object.values(res.data.orders.data);
          setOrders(array.slice());
        }
        inputRef.current.value = e.target.value
      })
    }
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

  function prevPage() {

    let value = Number(inputRef.current.value) - 1
    if (value < 1) {
      return
    }
    let url = "https://backend.f4koin.cyou/api/getAllOrder?page=" + value;
    GetAPIToken(url).then(res => {
      if (Array.isArray(res.data.orders.data)) {
        setOrders(res.data.orders.data)
      }
      else {
        let array = Object.values(res.data.orders.data);
        setOrders(array.slice());
      }
      inputRef.current.value = value
    })
  }

  function logOut(e) {
    e.preventDefault();
    let url = BaseURL() + "logout"
    PostAPINoBody(url).then(res => {
      if (res.status === 200) {
        sessionStorage.removeItem('auth')
        navigate('/login')
      }
    })
  }
  return (
    <>
      <div className='dashboard d-flex'>
        <div className='menu col bg-white shadow-sm p-2 d-flex flex-column'>
          <div className="profile d-flex align-items-center p-4 mx-3 mt-3 mb-5 rounded">
            <img src={profile.userAvatar} alt="" className="profile__avt rounded-circle" />
            <div className='col ms-5'>
              <p className='m-0 fs-3'>{profile.userFullName}</p>
              <p className='m-0 text-danger fs-3'>Super Admin</p>
            </div>
          </div>
          <div className="profile menu__btn text-center p-3 m-3 rounded menu__focus">
            <Link className='text-decoration-none text-mute fw-semibold m-0 fs-3 d-flex align-items-center'>
              <i className="fa-solid fa-house"></i>
              Trang chính
            </Link>
          </div>
          <p className='text-secondary ms-2 fs-4 text-uppercase mb-0'>
            Sản phẩm
          </p>
          <div className="profile menu__btn text-center p-3 m-3 rounded menu__hover">
            <Link to='/admin/fish' className='text-decoration-none text-muted fw-semibold m-0 fs-3 d-flex align-items-center'>
              <i className="fa-solid fa-fish"></i>
              Xem tất cả cá
            </Link>
          </div>
          <div className="profile menu__btn text-center p-3 m-3 rounded menu__hover">
            <Link className='text-muted text-decoration-none fw-semibold m-0 fs-3 d-flex align-items-center'>
              <i className="fa-solid fa-box"></i>
              Xem tất cả sản phẩm
            </Link>
          </div>
          <p className='text-secondary ms-2 fs-4 text-uppercase mb-0'>
            Người dùng
          </p>
          <div className="profile menu__btn text-center p-3 m-3 rounded menu__hover">
            <Link className='text-muted text-decoration-none fw-semibold m-0 fs-3 d-flex align-items-center'>
              <i className="fa-solid fa-users"></i>
              Xem tất cả người dùng
            </Link>
          </div>
          <div className="profile menu__btn text-center p-3 m-3 rounded menu__hover">
            <Link className='text-muted text-decoration-none fw-semibold m-0 fs-3 d-flex align-items-center'>
              <i className="fa-solid fa-message"></i>
              Xem tin nhắn
            </Link>
          </div>
          <p className='text-secondary ms-2 fs-4 text-uppercase mb-0'>
            Cá nhân
          </p>
          <div className="profile menu__btn text-center p-3 m-3 rounded menu__hover">
            <Link onClick={e=> logOut(e) } className='text-muted text-decoration-none fw-semibold m-0 fs-3 d-flex align-items-center'>
              <i class="fa-solid fa-person-running"></i>
              Đăng xuất
            </Link>
          </div>
        </div>
        <div className='d-flex dashboard-content'>
          <div className='orders-section col-sm-6 bg-white rounded m-5 p-3 shadow-sm'>
            <div className="profile d-flex justify-content-around align-items-center p-4 mx-3 mt-3 rounded position-relative">
              <i className="fa-solid fa-truck-fast truck"></i>
              <p className='text-secondary m-0'>Quản lý đơn hàng</p>
            </div>
            <p className='text-secondary fs-3 fw-semibold text-uppercase mb-0'>Đơn Hàng</p>
            <div className="profile d-flex justify-content-between align-items-center p-4 border-bottom position-relative">
              <p className='text-secondary fs-2 fw-semibold m-0 col text-center'>ID</p>
              <p className='text-secondary fs-2 fw-semibold m-0 col text-center'>Trạng thái</p>
              <p className='text-secondary fs-2 fw-semibold m-0 col text-center'>Thành tiền</p>
              <input onClick={(e) => selectAll(e.target.checked)} type="checkbox" name="mainBox" id="mainBox" className='position-absolute top-50 end-0 translate-middle me-4' />
            </div>
            {/* <ListOrder number='1'></ListOrder> */}
            {orders.map(item => {
              listID.push(item.order_id)
              return (
                <>
                  <Order order_id={item.order_id} order_status={item.order_status} order_tinhtien={item.order_tinhtien}></Order>
                </>
              )
            })}
            <div className='d-flex align-items-center justify-content-center mt-4'>
              <i className="fa fa-arrow-left btn-next fs-2 me-3" onClick={prevPage}></i>
              <input ref={inputRef} onKeyDown={e => gotoPage(e)} type="text" name="" id="page__number" defaultValue={1} className='fs-3 text-center' />
              <i className="fa fa-arrow-right btn-prev fs-2 ms-3" onClick={nextPage}></i>
            </div>
            <p className='text-secondary fs-3 fw-semibold text-uppercase my-4'>Hành động</p>
            <div className='d-flex justify-content-between'>
              <div className="action__btn fs-3 fw-semibold btn btn-outline-warning">Đang chờ</div>
              <div className="action__btn fs-3 fw-semibold btn btn-outline-primary">Đang giao</div>
              <div className="action__btn fs-3 fw-semibold btn btn-outline-success">Đã giao</div>
              <div className="action__btn fs-3 fw-semibold btn btn-outline-danger">Hủy</div>
            </div>
          </div>
          <div className='col-sm-3 statistic bg-white rounded m-5 p-3 shadow-sm'>
            <div className="profile d-flex justify-content-around align-items-center p-4 mx-3 mt-3 rounded position-relative">
              <i className="fa-solid fa-chart-simple ms-2 position-absolute chart"></i>
              <p className='text-muted m-0'>
                Thống kê doanh thu
              </p>
            </div>
            <div className="d-flex flex-column p-4 mx-3 mt-3 mb-5 rounded">
              <p className='text-muted fw-semibold m-0 text-center'>Hôm nay</p>
              <div className='d-flex justify-content-between'>
                <p className='m-0 fs-2'>
                  <i className="fa-solid fa-credit-card me-3 text-success"></i>
                  Tổng doanh thu
                </p>
                <p className='m-0 fs-2'>{dayProfit}</p>
              </div>
              <div className='fs-3 fw-semibold text-success mb-0'>
                + 10 tỷ VND
              </div>
              <div className='d-flex justify-content-between'>
                <p className='m-0 fs-2'>
                  <i className="fa-solid fa-clipboard me-3 text-info"></i>
                  Số lượng đơn hàng bán được
                </p>
                <p className='m-0 fs-2'>10 tỷ</p>
              </div>
              <div className='fs-3 fw-semibold text-success mb-0'>
                + 10 tỷ VND
              </div>
            </div>
            <div className="d-flex flex-column p-4 mx-3 mt-3 mb-5 rounded">
              <p className='text-muted fw-semibold m-0 text-center'>Trong tháng này</p>
              <div className='d-flex justify-content-between'>
                <p className='m-0 fs-2'>
                  <i className="fa-solid fa-credit-card me-3 text-success"></i>
                  Tổng doanh thu
                </p>
                <p className='m-0 fs-2'>{monthProfit}</p>
              </div>
              <div className='fs-3 fw-semibold text-success mb-0'>
                + 10 tỷ VND
              </div>
              <div className='d-flex justify-content-between'>
                <p className='m-0 fs-2'>
                  <i className="fa-solid fa-clipboard me-3 text-info"></i>
                  Số lượng đơn hàng bán được
                </p>
                <p className='m-0 fs-2'>10 tỷ</p>
              </div>
              <div className='fs-3 fw-semibold text-success mb-0'>
                + 10 tỷ VND
              </div>
            </div>
            <div className="d-flex flex-column p-4 mx-3 mt-3 mb-5 rounded">
              <p className='text-muted fw-semibold m-0 text-center'>Trong năm nay</p>
              <div className='d-flex justify-content-between'>
                <p className='m-0 fs-2'>
                  <i className="fa-solid fa-credit-card me-3 text-success"></i>
                  Tổng doanh thu
                </p>
                <p className='m-0 fs-2'>{yearProfit}</p>
              </div>
              <div className='fs-3 fw-semibold text-success mb-0'>
                + 10 tỷ VND
              </div>
              <div className='d-flex justify-content-between'>
                <p className='m-0 fs-2'>
                  <i className="fa-solid fa-clipboard me-3 text-info"></i>
                  Số lượng đơn hàng bán được
                </p>
                <p className='m-0 fs-2'>10 tỷ</p>
              </div>
              <div className='fs-3 fw-semibold text-success mb-0'>
                + 10 tỷ VND
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashBoard;