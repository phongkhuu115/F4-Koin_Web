import React from 'react';
import { Link } from 'react-router-dom'
function ShopFooter() {
  return (
    <div className="footer-section p-5 bg-white">
      <div className='m-5 border-bottom border-top p-5 d-flex justify-content-between'>
        <h1 className='fw-bold text-uppercase'>Koi Store</h1>
        <div>
          <h2>Account</h2>
          <div className='d-flex flex-column mt-4 fs-4'>
            <a href="" className='footer-link text-decoration-none text-black my-2'>Wishlist</a>
            <a href="" className='footer-link text-decoration-none text-black my-2'>Cart</a>
            <a href="" className='footer-link text-decoration-none text-black my-2'>Track Order</a>
            <a href="" className='footer-link text-decoration-none text-black my-2'>Shipping Details</a>
          </div>
        </div>
        <div>
          <h2>Useful Links</h2>
          <div className='d-flex flex-column mt-4 fs-4'>
            <a href="" className='footer-link text-decoration-none text-black my-2'><Link to='/about-us' className="footer-link text-decoration-none text-black my-2">About Us</Link></a>
            <a href="" className='footer-link text-decoration-none text-black my-2'><Link to='/home' className="footer-link text-decoration-none text-black my-2">Contact</Link></a>
            <a href="" className='footer-link text-decoration-none text-black my-2'><Link to='/home' className="footer-link text-decoration-none text-black my-2">Hot deals</Link></a>
            <a href="" className='footer-link text-decoration-none text-black my-2'><Link to='/home' className="footer-link text-decoration-none text-black my-2">Promotions</Link></a>
            <a href="" className='footer-link text-decoration-none text-black my-2'><Link to='/home' className="footer-link text-decoration-none text-black my-2">Home</Link></a>
          </div>
        </div>
        <div>
          <h2>Help Center</h2>
          <div className='d-flex flex-column mt-4 fs-4'>
            <a href="" className='footer-link text-decoration-none text-black my-2'>Payments</a>
            <a href="" className='footer-link text-decoration-none text-black my-2'>Refund</a>
            <a href="" className='footer-link text-decoration-none text-black my-2'>Checkout</a>
            <a href="" className='footer-link text-decoration-none text-black my-2'>Shipping</a>
            <a href="" className='footer-link text-decoration-none text-black my-2'>Q&A</a>
            <a href="" className='footer-link text-decoration-none text-black my-2'>Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopFooter;