import { type } from '@testing-library/user-event/dist/type';
import React, { useState, useEffect, useRef } from 'react';
import { MoneyFormat, UUID_Format } from '../helpers/DataFormat';
import { BaseURL } from '../helpers/GlobalFunction';

function App(props) {
  const statusRef = useRef(null)

  const pending = 'bg-warning text-orange'
  const delivering = 'bg-info text-blue'
  const delivered = 'bg-success text-green'
  const bomb = 'bg-danger text-red'

  function setClass(status) { 
    if (status === 'Pending') {
      return pending
    }
    if (status === 'Delivering') {
      return delivering
    }
    if (status === 'Delivered') {
      return delivered
    }
    if (status === 'Bomb') {
      return bomb
    }
  }

  return (
    <>
      <div className="profile d-flex p-4 position-relative border-bottom">
        <p className='fs-3 m-0 col text-center'>
          {UUID_Format(props.order_id)}
        </p>
        <p ref={statusRef} className={`fs-3 m-0 col text-center fw-semibold order__status rounded-5 py-1 ${setClass(props.order_status)}`}>{props.order_status}</p>
        <p className='fs-3 m-0 col text-center'>{
          MoneyFormat(props.order_tinhtien)
        } vnd</p>
        <input type="checkbox" name="" id="" className='position-absolute top-50 end-0 translate-middle me-4 item-box' />
      </div>
    </>
  )
}

export default App;