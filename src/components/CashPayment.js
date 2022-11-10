import React, { useState, useEffect } from 'react';
import hand_cash from '../cash_in_hand.png'
function Cash(props) {

  return (
    <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
      <img src={hand_cash} alt="" style={{width: "30rem"}}/>
      <p className='fs-4 fst-italic mt-5'> Vui lòng chuẩn bị số tiền cần thanh toán</p>
    </div>
  )
}

export default Cash;