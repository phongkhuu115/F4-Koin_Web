import React, { useState, useEffect, useRef } from 'react';
import { ReactDOM } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Bank from './BankPayment';
import Momo from './MomoPayment';
import Cash from './CashPayment';
import { BaseURL, GetAPIToken, PostAPIToken } from './helpers/GlobalFunction';
import { MoneyFormat } from './helpers/DataFormat';



function App(props) {
  const [hasRender, setRender] = useState();
  const [orderID, setOrderID] = useState('');
  const [orderSum, setOrderSum] = useState('10000000');
  const [orderItems, setOrderItems] = useState([{
    productName: "Test Product",
    productPrice: "9999999"
  }])
  const [method, setMethod] = useState('')
  const location = useLocation();
  const onShow = React.useCallback((e) => setRender(e.target.id), []);
  const statusRef = useRef();
  useEffect(() => {
    let url = BaseURL() + "getSpecifyOrder?order_id=" + location.state.id;
    GetAPIToken(url).then(res => {
      if (res.data.message === "success") {
        setOrderID(res.data.order.order_id)
        setOrderSum(res.data.order.order_tinhtien)
        setOrderItems(res.data.order.item_in_order.slice())
      }
    })
  }, [])
  function handleCompleteOrder() {
    let url = BaseURL() + "placeOrder"
    let body = {
      order_id: orderID,
      payment_method: method
    }
    // console.log(body)
    PostAPIToken(url, body).then(res => {
      if (res.data.message === 'success') {
        statusRef.current.innerHTML = 'Đặt Hàng Thành Công'
      }
    })
  }
  function RenderMethod(e) {
    if (hasRender === 'Bank') {
      return <Bank></Bank>
    }
    if (hasRender === 'Momo') {
      return <Momo></Momo>
    }
    if (hasRender === 'Cash') {
      return <Cash></Cash>
    }
  }

  return (
    <div className="container my-5 h-75">
      <div className="row mx-auto h-100">
        <form className="col d-flex flex-column justify-content-between h-100">
          <div id='payment-section'>
            <h1 className="fw-bold fs-2">Thanh Toán</h1>
            <hr />
            <p className="fw-bold fs-3 pt-3">Hình thức thanh toán:</p>
            <div className='d-flex pb-4'>
              <div className="form-check fs-4">
                <input className="form-check-input me-2 pay-method" type="radio" name="payMethod" id="Bank" onClick={e => setMethod('Bank')} onChange={onShow} />
                <label className="form-check-label" htmlFor="Bank">
                  Ngân hàng
                </label>
              </div>
              <div className="form-check mx-5 fs-4">
                <input className="form-check-input me-2 pay-method" type="radio" name="payMethod" id="Momo"  onChange={onShow} onClick={e => setMethod('Momo')}/>
                <label className="form-check-label" htmlFor="Momo">
                  Momo
                </label>
              </div>
              <div className="form-check fs-4">
                <input className="form-check-input me-2 pay-method" type="radio" name="payMethod" id="Cash"  onChange={onShow} onClick={e => setMethod('Cash')}/>
                <label className="form-check-label" htmlFor="Cash">
                  Tiền mặt
                </label>
              </div>
            </div>
            {hasRender && <RenderMethod></RenderMethod>}
            <p ref={statusRef} className="span-4"></p>
          </div>
          <div>
            <button type="button" className="btn btn-success py-2 w-100 fs-4 mb-3" onClick={handleCompleteOrder}>Đặt Hàng</button>
          </div>
        </form>
        <div className="col bg-light border-start ms-5 px-5">
          <div className='d-flex justify-content-between mt-4'>
            <h1 className="fw-bold fs-2">Mã Đơn Hàng</h1>
            <h1 className="fw-bold fs-2">{orderID}</h1>
          </div>
          <hr />
          <p className='text-muted fs-2 mb-0'>Sản phẩm đã mua</p>
          <div className="container py-4">
            <div className="row fs-4">
              {orderItems.map(item => {
                return (
                  <>
                    <div className="col-sm-8 ps-0">{item.productName}</div>
                    <div className="col-sm-4 fw-bold">{item.productPrice} VND</div>
                  </>
                )
              })}
            </div>
          </div>
          <hr />
          <p className='fs-2 text-muted mb-0'>Mã giảm giá</p>
          <div className="mb-3 d-flex py-4">
            <input type="text" className="form-control p-2 me-2 fs-4 px-4" placeholder="Gift or discount code"
              aria-label="discount" aria-describedby="button-addon2" />
            <button type="button" className="btn btn-secondary fs-5 px-5 fw-bold lh-lg py-0">Apply</button>
          </div>
          <hr />
          <div className="container fs-4 py-3">
            <div className="row">
              <div className="col-sm-8 fw-bold ps-0">Tạm tính</div>
              <div className="col-sm-4 fw-bold">{MoneyFormat(orderSum)} VND</div>
            </div>
          </div>
          <hr />
          <div className="container pt-4">
            <div className="row fs-4">
              <div className="col-sm-8 fw-bold ps-0">Thành tiền</div>
              <div className="col-sm-4 fw-bold fs-2">{MoneyFormat(orderSum)} VND</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;