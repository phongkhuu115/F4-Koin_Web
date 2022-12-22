import React from 'react';
import { Link } from 'react-router-dom'
function ShopFooter() {
  return (
    <div className="footer-section p-5 bg-white">
      <div className='m-5 border-bottom border-top p-5'>
        <h1 className='fw-bold text-uppercase'>Koi Store</h1>
        <p className='span-4 mt-3'>Mọi thắc mắc xin vui lòng gửi về:</p>
        <p className='span-4'>
          Email: phongkm @gmail.com | taina @gmail.com | anhndn @gmail.com
        </p>
        <p className="span-4">Điện thoại: 0937001508</p>
        <p className="span-4">1905/31 đường Vô Tri, phường Vô Giác, xã Vô Cảm, thành phố Vô Tâm, Việt Nam.</p>
      </div>
      <Link to='/home/userchat' className="btn btn-light fs-3 btn-logout">Chat Với người bán</Link>
    </div>
  );
}

export default ShopFooter;