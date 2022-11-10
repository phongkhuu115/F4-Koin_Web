import React, { useState, useEffect } from 'react';
import { ReactDOM } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Bank from './BankPayment';
import Momo from './MomoPayment';
import Cash from './CashPayment';



function App(props) {
  const [hasRender, setRender] = useState();
  const onShow = React.useCallback((e) => setRender(e.target.id), []);
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
    <div class="container my-5 h-75">
      <div class="row mx-auto h-100">
        <form class="col d-flex flex-column justify-content-between h-100">
          <div id='payment-section'>
            <h1 class="fw-bold fs-2">Thanh Toán</h1>
            <hr />
            <p class="fw-bold fs-3 pt-3">Hình thức thanh toán:</p>
            <div className='d-flex pb-4'>
              <div class="form-check fs-4">
                <input class="form-check-input me-2 pay-method" type="radio" name="payMethod" id="Bank" onChange={onShow} />
                <label class="form-check-label" for="Bank">
                  Ngân hàng
                </label>
              </div>
              <div class="form-check mx-5 fs-4">
                <input class="form-check-input me-2 pay-method" type="radio" name="payMethod" id="Momo" onChange={onShow}/>
                <label class="form-check-label" for="Momo">
                  Momo
                </label>
              </div>
              <div class="form-check fs-4">
                <input class="form-check-input me-2 pay-method" type="radio" name="payMethod" id="Cash" onChange={onShow}/>
                <label class="form-check-label" for="Cash">
                  Tiền mặt
                </label>
              </div>
            </div>
          {hasRender && <RenderMethod></RenderMethod>}
          </div>
          <div>
            <button type="button" class="btn btn-success py-2 w-100 fs-4 mb-3">Thanh Toán</button>
            <p class="text-muted fs-5">
              Your personal data will be used to process your order, support your experience
              throughout this website, and for other purposes described in our privacy policy.
            </p>
          </div>
        </form>
        <div class="col bg-light border-start ms-5 ps-5">
          <h1 class="fw-bold fs-2">Order Summary</h1>
          <hr />
          <div class="container py-4">
            <div class="row fs-4">
              <div class="col-sm-8 ps-0">Cá koi 1</div>
              <div class="col-sm-4 fw-bold">VND</div>
            </div>
          </div>
          <hr />
          <div class="mb-3 d-flex py-4">
            <input type="text" class="form-control p-2 me-2 fs-4 px-4" placeholder="Gift or discount code"
              aria-label="discount" aria-describedby="button-addon2" />
            <button type="button" class="btn btn-secondary fs-5 px-5 fw-bold lh-lg py-0">Apply</button>
          </div>
          <hr />
          <div class="container fs-4 py-3">
            <div class="row">
              <div class="col-sm-8 fw-bold ps-0">Subtotal</div>
              <div class="col-sm-4 fw-bold">VND</div>
            </div>
          </div>
          <div class="container fs-4 py-3">
            <div class="row">
              <div class="col-sm-8 fw-bold ps-0">Shipping</div>
              <div class="col-sm-4 fw-bold">VND</div>
            </div>
          </div>
          <hr />
          <div class="container pt-4">
            <div class="row fs-4">
              <div class="col-sm-8 fw-bold ps-0">Total</div>
              <div class="col-sm-4 fw-bold fs-2">VND</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;