import React, { useState, useEffect, useRef } from 'react';
import { MoneyFormat } from '../helpers/DataFormat';

function App(props) {
  const [state, setState] = useState('');
  const statusRef = useRef(null)
  function handleEdit() {
    const overlay = document.querySelector('.edit-popup')
    overlay.style.display = 'flex'
    sessionStorage.setItem('edit_prod', props.id)
  }
  useEffect(() => {
    if (props.quantity > 0) {
      statusRef.current.classList.add('bg-success')
      statusRef.current.classList.add('text-green')
    }
    else {
      statusRef.current.classList.add('bg-danger')
      statusRef.current.classList.add('text-red')
    }
  }, []);

  return (
    <>
      <div className='d-flex align-items-center py-3 border-bottom'>
        <input type="checkbox" name="main-checkbox" id="main-checkbox" className='me-5 item-box' />
        <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center text-wrap'>{props.name}</p>
        <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>{props.sex}</p>
        <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>{props.quantity}</p>
        <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>{props.size} cm</p>
        <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>
          {MoneyFormat(props.price)} VND
        </p>
        <p ref={statusRef} className='fs-2 fw-semibold mb-0 product__status p-2 rounded-pill product__col-status text-center'> {props.quantity > 0 ? "Còn Hàng" : "Hết Hàng"}</p>
        <p className='text-light fs-2 fw-semibold mb-0 btn btn-secondary col ms-5 btn-edit' onClick={handleEdit}>
          <i class="fa-solid fa-pen-to-square"></i>
        </p>
      </div>
    </>
  )
}

export default App;