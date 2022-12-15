import React, { useState, useEffect } from 'react';
import { MoneyFormat, UUID_Format } from '../helpers/DataFormat';
import { BaseURL } from '../helpers/GlobalFunction';

function App(props) {
  const [state, setState] = useState('');

  useEffect(() => {
    let status = document.querySelectorAll('.order__status')
    for (let i = 0; i < status.length; i++) {
      if (status[i].innerHTML === 'Pending') {
        status[i].classList.add('bg-warning')
        status[i].classList.add('text-orange')
      }
      if (status[i].innerHTML === 'Delivering') {
        status[i].classList.add('bg-info')
        status[i].classList.add('text-blue')
      }
      if (status[i].innerHTML === 'Delivered') {
        status[i].classList.add('bg-success')
        status[i].classList.add('text-green')
      }
      if (status[i].innerHTML === 'Bomb') {
        status[i].classList.add('bg-danger')
        status[i].classList.add('text-red')
      }
    }
  }, []);

  return (
    <>
      <div className="profile d-flex p-4 position-relative border-bottom">
        <p className='fs-2 m-0 col text-center'>
          {UUID_Format(props.order_id)}
        </p>
        <p className='fs-2 m-0 col text-center fw-semibold order__status rounded-5 py-1'>{props.order_status}</p>
        <p className='fs-2 m-0 col text-center'>{
          MoneyFormat(props.order_tinhtien)
        } vnd</p>
        <input type="checkbox" name="" id="" className='position-absolute top-50 end-0 translate-middle me-4' />
      </div>
    </>
  )
}

export default App;