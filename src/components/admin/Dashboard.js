import React, { useState, useEffect } from 'react';
import '../../styles/DashBoard.css'
import { BaseURL, GetAPIToken } from '../helpers/GlobalFunction';
import { MoneyFormat, UUID_Format } from '../helpers/DataFormat';
import Order from './Order'
import { Navigate, redirect, useNavigate } from 'react-router-dom';

function DashBoard(props) {
  const [profile, setProfile] = useState({
    userFullName: "admin",
    userAvatar: "https://img.freepik.com/premium-vector/cute-kitten-sticker-red-cat-avatar-cartoon-face-style-kawaii-vector-illustration_361213-995.jpg?w=2000",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()
  let listID = [];
  let checkBoxs = [];

  useEffect(() => {
    let url = BaseURL() + "getMyProfile"
    GetAPIToken(url).then(res => {
      setProfile(res.data.profile)
      console.log(res.data.profile.userFullName)
      if (profile.userFullName !== 'admin') {
        navigate('/home')
      }
    })
  }, [])

  function ListOrder(props) {
    let url = BaseURL() + "getAllOrder?page=" + currentPage
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
      GetAPIToken(url).then(res => {
        if (Array.isArray(res.data.orders.data)) {
          setOrders(res.data.orders.data)
        }
        else {
          let array = Object.values(res.data.orders.data);
          setOrders(array.slice());
        }
      })
    }, [])
    return orders.map(item => {
      listID.push(item.order_id)
      return (
        <>
          <Order order_id={item.order_id} order_status={item.order_status} order_tinhtien={item.order_tinhtien}></Order>
        </>
      )
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
            <p className='text-mute fw-semibold m-0 fs-3 d-flex align-items-center'>
              <i className="fa-solid fa-house"></i>
              Trang chính
            </p>
          </div>
          <p className='text-secondary ms-2 fs-4 text-uppercase mb-0'>
            Sản phẩm
          </p>
          <div className="profile menu__btn text-center p-3 m-3 rounded menu__hover">
            <p className='text-mute fw-semibold m-0 fs-3 d-flex align-items-center'>
              <i className="fa-solid fa-fish"></i>
              Xem tất cả cá
            </p>
          </div>
          <div className="profile menu__btn text-center p-3 m-3 rounded menu__hover">
            <p className='text-mute fw-semibold m-0 fs-3 d-flex align-items-center'>
              <i className="fa-solid fa-box"></i>
              Xem tất cả sản phẩm
            </p>
          </div>
          <p className='text-secondary ms-2 fs-4 text-uppercase mb-0'>
            Người dùng
          </p>
          <div className="profile menu__btn text-center p-3 m-3 rounded menu__hover">
            <p className='text-mute fw-semibold m-0 fs-3 d-flex align-items-center'>
              <i className="fa-solid fa-users"></i>
              Xem tất cả người dùng
            </p>
          </div>
          <div className="profile menu__btn text-center p-3 m-3 rounded menu__hover">
            <p className='text-mute fw-semibold m-0 fs-3 d-flex align-items-center'>
              <i className="fa-solid fa-message"></i>
              Xem tin nhắn
            </p>
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
              <input type="checkbox" name="" id="" className='position-absolute top-50 end-0 translate-middle me-4' />
            </div>
            <ListOrder number='1'></ListOrder>
            <div className='d-flex align-items-center justify-content-center mt-4'>
              <i className="fa fa-arrow-left btn-next fs-2 me-3"></i>
              <input type="text" name="" id="page__number" defaultValue={1} className='fs-3 text-center'/>
              <i className="fa fa-arrow-right btn-prev fs-2 ms-3"></i>
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
                <p className='m-0 fs-2'>10 tỷ</p>
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
                <p className='m-0 fs-2'>10 tỷ</p>
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
                <p className='m-0 fs-2'>10 tỷ</p>
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