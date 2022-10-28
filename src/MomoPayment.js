import React, { useState, useEffect } from 'react';
import qr from './momo_qr.jpg'

function Momo(props) {
  const [state, setState] = useState('');

  useEffect(() => {
    return () => {

    }
  }, []);

  return (
    <>
      <div className="d-flex flex-column">
        <p className='fs-3'> Chuyển tiền đến số điện thoại: <span className="fw-bold">0937001063</span></p>
        <p className="fs-3">Người nhận: <span className="fw-bold"> Khưu Minh Phong</span></p>
        <p className="fs-3">Nội dung chuyển khoản: <span className="fw-bold"> Xác nhận - "Tên đơn hàng"</span></p>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column mb-5 mt-3">
        <p className="fw-bold">Hoặc quét mã Thanh Toán</p>
        <img src={qr} alt="" style={{width: "25rem"}} />
      </div>
    </>
  )
}

export default Momo;