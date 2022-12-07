import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { MoneyFormat } from './helpers/DataFormat'


const CartItem = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  function increaseValue() {
    var value = parseInt(ref.current.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    ref.current.value = value;
  }

  function decreaseValue() {
    var value = parseInt(ref.current.value, 10);
    value = isNaN(value) ? 0 : value;
    value--;
    value = value <= 0 ? 0 : value;
    ref.current.value = value;
  }
  useEffect(() => {
    return () => {

    }
  }, []);

  return (
    <>
      <div className='m-5 bg-white p-5 rounded d-flex text-start'>
        <img src={props.imageUrl} alt="" className='cart__item-img' />
        <div className='d-flex justify-content-between w-100'>
          <div className='d-flex flex-column ms-3 my-auto'>
            <p className='text-uppercase fw-bold' style={{ minWidth: 300 }}>{props.productName}</p>
            <p>{MoneyFormat(props.productPrice)} vnd</p>
            <div className='d-flex'><span className='bg-primary text-white fs-3 px-3 py-2 text-uppercase fw-bold rounded'>{props.productSex === "Female" ? "Cái" : "Đực"}</span><span className='bg-danger text-white fs-3 px-3 py-2 text-uppercase fw-bold rounded ms-2'>-{props.productDiscount}%</span><span className='bg-success text-white fs-3 px-3 py-2 text-uppercase fw-bold rounded ms-2'>{props.productSize === null ? 0 : props.productSize} inch</span></div>
          </div>
          <div className='me-auto my-auto ms-5'>
            <div className='d-flex'>
              <div id="decrease" onClick={decreaseValue} className='value-button btn fs-3 px-4 decrease'>-</div>
              <input ref={ref} type="text" id="number" defaultValue={props.quantity} className='fs-4' readOnly/>
              <div id="increase" onClick={increaseValue} className='value-button btn fs-3 px-4 increase'>+</div>
            </div>
          </div>
          <div className='d-flex align-items-center'>
            <input type="checkbox" name="pick" className=''></input>
          </div>
        </div>
      </div>
    </>
  )
})

export default CartItem;