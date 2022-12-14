import React, { useState, useEffect } from 'react';
import '../../styles/DashBoard.css'
import { BaseURL, GetAPIToken } from '../helpers/GlobalFunction';
import { MoneyFormat, UUID_Format } from '../helpers/DataFormat';
import Order from './Order'
import { Navigate, redirect, useNavigate } from 'react-router-dom';

function DashBoard(props) {
  const [profile, setProfile] = useState({
    userFullName: "Khưu Minh Phong",
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
        <div className='col'>
          <div className="profile d-flex justify-content-around align-items-center p-4 bg-black mx-3 mt-3 mb-5 rounded h-25">
            <img src={profile.userAvatar} alt="" className="profile__avt rounded-circle" />
            <div>
              <p className='m-0 text-white'>{profile.userFullName}</p>
              <p className='m-0 text-danger'>Super Admin</p>
            </div>
          </div>
          <div className="profile d-flex justify-content-around p-4 m-3 rounded btn btn-primary">
            <p className='text-white m-0'>Trang chính</p>
          </div>
          <div className="profile d-flex justify-content-around p-4 m-3 rounded btn btn-primary">
            <p className='text-white m-0'>Xem tất cả cá</p>
          </div>
          <div className="profile d-flex justify-content-around p-4 m-3 rounded btn btn-primary">
            <p className='text-white m-0'>Xem tất cả sản phẩm</p>
          </div>
          <div className="profile d-flex justify-content-around p-4 m-3 rounded btn btn-primary">
            <p className='text-white m-0'>Xem tất cả người dùng</p>
          </div>
          <div className="profile d-flex justify-content-around p-4 m-3 rounded btn btn-primary">
            <p className='text-white m-0'>Xem tin nhắn</p>
          </div>
        </div>
        <div className='col-sm-6'>
          <div className="profile d-flex justify-content-around align-items-center p-4 bg-black mx-3 mt-3 mb-5 rounded h-25">
            <p className='text-white m-0'>Đơn Hàng</p>
          </div>
          <div className="profile d-flex justify-content-between align-items-center p-4 bg-black m-3 rounded">
            <p className='text-white m-0 col text-center'>ID</p>
            <p className='text-white m-0 col text-center'>Trạng thái</p>
            <p className='text-white m-0 col text-center'>Thành tiền</p>
          </div>
          <ListOrder number='1'></ListOrder>
        </div>
        <div className='col-sm-3'>
          <div className="profile d-flex justify-content-around align-items-center p-4 bg-black mx-3 mt-3 mb-5 rounded h-25">
            <p className='text-white m-0'>Doanh thu</p>
          </div>
          <div className="profile d-flex flex-column p-4 bg-black mx-3 mt-3 mb-5 rounded h-25">
            <p className='text-white m-0 text-center'>Theo ngày</p>
            <div className='d-flex justify-content-between'>
              <p className='m-0 text-white'>Tổng doanh thu:</p>
              <p className='m-0 text-white'>10 tỷ</p>
            </div>
            <div className='d-flex justify-content-between'>
              <p className='m-0 text-white'>Số lượng đơn hàng bán được:</p>
              <p className='m-0 text-white'>10 tỷ</p>
            </div>
          </div>
          <div className="profile d-flex flex-column p-4 bg-black mx-3 mt-3 mb-5 rounded h-25">
            <p className='text-white m-0 text-center'>Theo tháng</p>
            <div className='d-flex justify-content-between'>
              <p className='m-0 text-white'>Tổng doanh thu:</p>
              <p className='m-0 text-white'>10 tỷ</p>
            </div>
            <div className='d-flex justify-content-between'>
              <p className='m-0 text-white'>Số lượng đơn hàng bán được:</p>
              <p className='m-0 text-white'>10 tỷ</p>
            </div>
          </div>
          <div className="profile d-flex flex-column p-4 bg-black mx-3 mt-3 mb-5 rounded h-25">
            <p className='text-white m-0 text-center'>Theo năm</p>
            <div className='d-flex justify-content-between'>
              <p className='m-0 text-white'>Tổng doanh thu:</p>
              <p className='m-0 text-white'>10 tỷ</p>
            </div>
            <div className='d-flex justify-content-between'>
              <p className='m-0 text-white'>Số lượng đơn hàng bán được:</p>
              <p className='m-0 text-white'>10 tỷ</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashBoard;