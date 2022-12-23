import React, { useState, useEffect, useRef } from 'react';
import '../../styles/DashBoard.css'
import { BaseURL, GetAPIToken, PostAPINoBody, PostAPIToken } from '../helpers/GlobalFunction';
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
  const [dayArbitrage, setDayArbitrage] = useState(1);
  const [monthProfit, setMonthProfit] = useState(1);
  const [monthArbitrage, setMonthArbitrage] = useState(1);
  const [yearProfit, setYearProfit] = useState(1);
  const [yearArbitrage, setYearArbitrage] = useState(1);
  const [dayOrder, setDayOrder] = useState(1)
  const [dayMore, setDayMore] = useState(1)
  const [monthOrder, setMonthOrder] = useState(1)
  const [monthMore, setMonthMore] = useState(1)
  const [yearOrder, setYearOrder] = useState(1)
  const [yearMore, setYearMore] = useState(1)
  const [waitingOrder, setWaitingOrder] = useState(1)
  const [pageNum, setPageNum] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  let listID = [];
  let checkBoxs = [];

  const up = 'text-success'
  const down = 'text-danger'

  useEffect(() => {
    let url = BaseURL() + "getMyProfile"
    GetAPIToken(url).then(res => {
      setProfile(res.data.profile)
      if (profile.userFullName !== 'admin') {
        navigate('/home')
      }
    })
  }, [])

  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    console.log(today)
    let url = BaseURL() + "getReportByDay?date=" + today
    GetAPIToken(url).then(res => {
      console.log(res.data.Sumary)
      setDayProfit(res.data.Sumary)
      setDayArbitrage(res.data.ArbitrageTurnOver)
      setDayOrder(res.data.todayAmountOfOrder)
      setDayMore(res.data.ArbitrageOrder)
    })
  }, [])

  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm;
    console.log(today)
    let url = BaseURL() + "getReportByMonth?date=" + today
    GetAPIToken(url).then(res => {
      setMonthProfit(res.data.Sumary)
      setMonthArbitrage(res.data.ArbitrageTurnOver)
      setMonthOrder(res.data.thisMonthAmountOfOrder)
      setMonthMore(res.data.ArbitrageOrder)
    })
  }, [])

  function handleAction(e, action) {
    let url = BaseURL() + "orderAction"
    let ids = ""
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
    console.log(ids)
    let body = {
      action: action,
      order_id: ids
    }
    PostAPIToken(url, body).then(res => {
      if (res.data.message === "success") {
        window.location.reload();
      }
    })
  }

  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy;
    console.log(today)
    let url = BaseURL() + "getReportByYear?date=" + today
    GetAPIToken(url).then(res => {
      setYearProfit(res.data.Sumary)
      setYearArbitrage(res.data.ArbitrageTurnOver)
      setYearOrder(res.data.thisYearAmountOfOrder)
      setYearMore(res.data.ArbitrageOrder)
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
              Cá
            </Link>
          </div>
          <div className="profile menu__btn text-center p-3 m-3 rounded menu__hover">
            <Link to = '/admin/products' className='text-muted text-decoration-none fw-semibold m-0 fs-3 d-flex align-items-center'>
              <i className="fa-solid fa-box"></i>
              Dụng Cụ
            </Link>
          </div>
          <p className='text-secondary ms-2 fs-4 text-uppercase mb-0'>
            Người dùng
          </p>
          <div className="profile menu__btn text-center p-3 m-3 rounded menu__hover">
            <Link to='/admin/users' className='text-muted text-decoration-none fw-semibold m-0 fs-3 d-flex align-items-center'>
              <i className="fa-solid fa-users"></i>
              Xem người dùng
            </Link>
          </div>
          <div className="profile menu__btn text-center p-3 m-3 rounded menu__hover">
            <Link to ='/admin/chat' className='text-muted text-decoration-none fw-semibold m-0 fs-3 d-flex align-items-center'>
              <i className="fa-solid fa-message"></i>
              Tin nhắn
            </Link>
          </div>
          <p className='text-secondary ms-2 fs-4 text-uppercase mb-0'>
            Cá nhân
          </p>
          <div className="profile menu__btn text-center p-3 m-3 rounded menu__hover">
            <Link onClick={e => logOut(e)} className='text-muted text-decoration-none fw-semibold m-0 fs-3 d-flex align-items-center'>
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
              <input ref={inputRef} onKeyDown={e => gotoPage(e)} type="text" name="" id="page__number" defaultValue={1} className='fs-4 text-center' />
              <i className="fa fa-arrow-right btn-prev fs-2 ms-3" onClick={nextPage}></i>
            </div>
            <p className='text-secondary fs-3 fw-semibold text-uppercase my-4'>Hành động</p>
            <div className='d-flex justify-content-between'>
              <div onClick={e => handleAction(e, 1)} className="action__btn fs-3 fw-semibold btn btn-outline-warning">Đang chờ</div>
              <div onClick={e => handleAction(e, 2)} className="action__btn fs-3 fw-semibold btn btn-outline-primary">Đang giao</div>
              <div onClick={e => handleAction(e, 3)} className="action__btn fs-3 fw-semibold btn btn-outline-success">Đã giao</div>
              <div onClick={e => handleAction(e, 4)} className="action__btn fs-3 fw-semibold btn btn-outline-danger">Hủy</div>
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
              <p className='text-muted fw-semibold m-0 text-center fs-3'>Hôm nay</p>
              <div className='d-flex justify-content-between'>
                <p className='m-0 fs-3'>
                  <i className="fa-solid fa-credit-card me-3 text-success"></i>
                  Tổng doanh thu
                </p>
                <p className='m-0 fs-3'>{dayProfit} vnd</p>
              </div>
              <div className={`fs-5 mt-1 mb-2 fw-semibold text-success mb-0 ${dayArbitrage > 0 ? up : down}`}>
                {dayArbitrage > 0 ? '+ ' + dayArbitrage : dayArbitrage} vnd
              </div>
              <div className='d-flex justify-content-between'>
                <p className='m-0 fs-3'>
                  <i className="fa-solid fa-clipboard me-3 text-info"></i>
                  Số lượng đơn hàng bán được
                </p>
                <p className='m-0 fs-3'>{dayOrder} đơn</p>
              </div>
              <div className={`fs-5 mt-1 mb-2 fw-semibold text-success mb-0 ${dayMore > 0 ? up : down}`}>
                {dayMore > 0 ? '+ ' + dayMore : dayMore} đơn
              </div>
          
            </div>
            <div className="d-flex flex-column p-4 mx-3 mt-3 mb-5 rounded">
              <p className='text-muted fw-semibold m-0 text-center fs-3'>Trong tháng này</p>
              <div className='d-flex justify-content-between'>
                <p className='m-0 fs-3'>
                  <i className="fa-solid fa-credit-card me-3 text-success"></i>
                  Tổng doanh thu
                </p>
                <p className='m-0 fs-3'>{monthProfit} vnd</p>
              </div>
              <div className={`fs-5 mt-1 mb-2 fw-semibold text-success mb-0 ${monthArbitrage > 0 ? up : down}`}>
                {monthArbitrage > 0 ? '+ ' + monthArbitrage : monthArbitrage} vnd
              </div>
              <div className='d-flex justify-content-between'>
                <p className='m-0 fs-3'>
                  <i className="fa-solid fa-clipboard me-3 text-info"></i>
                  Số lượng đơn hàng bán được
                </p>
                <p className='m-0 fs-3'>{monthOrder} đơn</p>
              </div>
              <div className={`fs-5 mt-1 mb-2 fw-semibold text-success mb-0 ${monthMore > 0 ? up : down}`}>
                {monthMore > 0 ? '+ ' + monthMore : monthMore} đơn
              </div>
            </div>
            <div className="d-flex flex-column p-4 mx-3 mt-3 mb-5 rounded">
              <p className='text-muted fw-semibold m-0 text-center fs-3'>Trong năm nay</p>
              <div className='d-flex justify-content-between'>
                <p className='m-0 fs-3'>
                  <i className="fa-solid fa-credit-card me-3 text-success"></i>
                  Tổng doanh thu
                </p>
                <p className='m-0 fs-3'>{yearProfit} vnd</p>
              </div>
              <div className={`fs-5 mt-1 mb-2 fw-semibold text-success mb-0 ${yearArbitrage > 0 ? up : down}`}>
                {yearArbitrage > 0 ? '+ ' + yearArbitrage : yearArbitrage} vnd
              </div>
              <div className='d-flex justify-content-between'>
                <p className='m-0 fs-3'>
                  <i className="fa-solid fa-clipboard me-3 text-info"></i>
                  Số lượng đơn hàng bán được
                </p>
                <p className='m-0 fs-3'>{yearOrder}</p>
              </div>
              <div className={`fs-5 mt-1 mb-2 fw-semibold text-success mb-0 ${yearMore > 0 ? up : down}`}>
                {yearMore > 0 ? '+ ' + yearMore : yearMore} đơn
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashBoard;