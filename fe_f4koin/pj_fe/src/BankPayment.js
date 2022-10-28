import React, { useState, useEffect } from 'react';
import bank_logo from './bank_logo.png'

function Bank(props) {
  return (
    <div className=''>
      <select class="form-select fs-4 py-2 px-4 mb-4" id="bankSelect">
        <option defaultValue={""} hidden>Chọn ngân hàng</option>
        <option value="1">Ngân hàng ngoại thương Việt Nam(VietcomBank)</option>
        <option value="2">Ngân hàng Đầu tư và Phát triển VN (BIDV)</option>
        <option value="3">NH Chính sách xã hội (VBSP)</option>
        <option value="4">NH Công thương VN (Vietinbank)</option>
        <option value="5">NH Nông nghiệp và Phát Triển Nông thôn VN (AGRIBANK)</option>
        <option value="6">NH Phát triển Nhà ĐBSCL (MHB)</option>
        <option value="7">NH Phát triển Việt Nam (VDB)</option>
      </select>
      <div class="mb-4 mt-3 fs-3">
        <label for="bankNum" class="form-label fw-bold mb-3">Số tài khoản: </label>
        <input type="email" class="form-control fs-4 py-2 px-4" id="bankNum" placeholder="099xxxxxxxx" />
      </div>
      <label htmlFor="shipSelect" class="fs-3 fw-bold mb-3">Hình thức vận chuyển: </label>
      <select class="form-select fs-4 py-2 px-4" id="shipSelect">
        <option value="1">Hỏa tốc</option>
        <option value="2">Ship nhanh</option>
        <option value="3">Giao hàng tiêu chuẩn</option>
      </select>
      <img src={bank_logo} alt="có thể là hình ảnh về nhiều ngân hàng" className='mt-5 w-100'/>
    </div>
  )
}

export default Bank;